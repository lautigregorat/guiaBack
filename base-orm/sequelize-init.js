const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize ("sqlite:" + "./.data/baseDatos.db")

const personajesDBZ = sequelize.define(
    "personajesDBZs",
    { IdPersonaje: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Ingrese el nombre obligatoriamente",

                },
            },
        },

        NivelDePoder: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'El nivel de poder es requerido',
                },
            },
        },

        fechaNacimiento: {
            type: DataTypes.DATEONLY
        },

        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
            notNull: {
                args: true,
                msg: "Ingrese activo obligatoriamente",

                }
            }
        },

        ComidaFavorita: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "la comida favorita es requerida"
                }
            }
        }
    },

    { hooks: {
            beforeValidate: function (personajesDBZ, options) {
            if (typeof personajesDBZ.Nombre === "string") {
                personajesDBZ.Nombre = personajesDBZ.Nombre.toUpperCase().trim();
            }
            },
        },
        timestamps: false,
    },

);

const equipos = sequelize.define(
    "equipos",
    { IdEquipo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Ingrese el nombre obligatoriamente",

                },
            },
        },

        CantCopas: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },

        fechaFundacion: {
            type: DataTypes.DATEONLY
        },

        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
            notNull: {
                args: true,
                msg: "Ingrese activo obligatoriamente",

                }
            }
        },

    },

    { hooks: {
            beforeValidate: function (equipos, options) {
            if (typeof equipos.Nombre === "string") {
                equipos.Nombre = equipos.Nombre.toUpperCase().trim();
            }
            },
        },
        timestamps: false,
    },

);

const comidas = sequelize.define(
    "comidas",
    { IdComida: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "El nombre es requerido",

                },
            },
        },

        Peso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'El peso es requerido',
                },
            },
        },

        FechaCreacion: {
            type: DataTypes.DATEONLY
        },

        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
            notNull: {
                args: true,
                msg: "Activo es requerido",

                }
            }
        },

    },

    { hooks: {
            beforeValidate: function (comidas, options) {
            if (typeof comidas.Nombre === "string") {
                comidas.Nombre = comidas.Nombre.toUpperCase().trim();
            }
            },
        },
        timestamps: false,
    },

);

const vehiculos = sequelize.define(
    "vehiculos",
    { IdVehiculo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Modelo: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Ingrese el Modelo obligatoriamente",

                },
            },
        },

        Cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'La cantidad es requerido',
                },
            },
        },

        FechaLanzamiento: {
            type: DataTypes.DATEONLY
        },

        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
            notNull: {
                args: true,
                msg: "Ingrese activo obligatoriamente",

                }
            }
        },

    },

    { hooks: {
            beforeValidate: function (vehiculos, options) {
            if (typeof vehiculos.Modelo === "string") {
                vehiculos.Modelo = vehiculos.Modelo.toUpperCase().trim();
            }
            },
        },
        timestamps: false,
    },

);


module.exports = {
    sequelize,
    personajesDBZ,
    equipos,
    comidas,
    vehiculos
};

