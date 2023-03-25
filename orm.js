const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto("newschema", "root", "Madmax12345678!", {
      host: "152.69.230.128",
      port: "3306",
      dialect: "mysql",
      //noAlias: true // as 별칭 미설정 여부
   }
);
auto.run((err)=>{
   if(err) throw err;
})