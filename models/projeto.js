const database = require("./../database");
const Sequelize = require("sequelize");
const Produto = database.define("produto", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome_produto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tipo_produto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao_produto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bairro: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  municipio: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },

},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Produto;