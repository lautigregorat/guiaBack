const express = require("express");
const router = express.Router();
const db = require('../base-orm/sequelize-init')
const { Op, ValidationError } = require("sequelize");

router.get("/api/personajesDBZ", async function (req, res, next) {
  let data = await db.personajesDBZ.findAll ({
      attributes: ["IdPersonaje","Nombre","NivelDePoder","fechaNacimiento", "Activo", "ComidaFavorita"],
  });
  res.status(200).json(data);
})

router.get("/api/personajesDBZ/:id", async function (req, res, next) {
    let data = await db.personajesDBZ.findAll({
        attributes: ["IdPersonaje","Nombre","NivelDePoder","fechaNacimiento", "Activo", "ComidaFavorita"],
        where: {IdPersonaje: req.params.id},
    });
    if (data.length > 0 ) res.status(200).json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
})



router.post("/api/personajesDBZ", async (req, res) => {
      let data = await db.personajesDBZ.create({
        Nombre: req.body.Nombre,
        NivelDePoder: req.body.NivelDePoder,
        fechaNacimiento: req.body.fechaNacimiento,
        Activo: req.body.Activo,
        ComidaFavorita: req.body.ComidaFavorita
      });
      res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  });
  

  router.put("/api/personajesDBZ/:id", async (req, res) => {
      let item = await db.personajesDBZ.findOne({
        attributes: [
          "IdPersonaje",
          "Nombre",
          "NivelDePoder",
          "fechaNacimiento",
          "Activo",
          "ComidaFavorita"
        ],
        where: { IdPersonaje: req.params.id },
      });
      if (!item) {
        res.status(404).json({ message: "personaje no encontrado" });
        return;
      }
      item.Nombre = req.body.Nombre;
      item.NivelDePoder = req.body.NivelDePoder;
      item.fechaNacimiento = req.body.fechaNacimiento;
      item.Activo = req.body.Activo;
      item.ComidaFavorita = req.body.ComidaFavorita;
      await item.save();
      res.sendStatus(200);
    
  });

  router.delete("/api/personajesDBZ/:id", async (req, res) => {
    let bajaFisica = false;
  
    if (bajaFisica) {
      // baja fisica
      let filasBorradas = await db.personajesDBZ.destroy({
        where: { IdPersonaje: req.params.id },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      // baja logica
      try {
        let data = await db.sequelize.query(
          "UPDATE personajesDBZs SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdPersonaje = :IdPersonaje",
          {
            replacements: { IdPersonaje: +req.params.id },
          }
        );
        res.sendStatus(200);
      } catch (err) {
        if (err instanceof ValidationError) {
          // si son errores de validacion, los devolvemos
          const messages = err.errors.map((x) => x.message);
          res.status(400).json(messages);
        } else {
          // si son errores desconocidos, los dejamos que los controle el middleware de errores
          throw err;
        }
      }
    }
  });
  
  
module.exports = router