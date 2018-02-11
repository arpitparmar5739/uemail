import server from './server';
import { configs } from '../configs/Configs';
import { sequelize, models } from './models/index';


models.Attachment.belongsTo(models.Email);

sequelize.sync()
    .then(() => {
        const port: number = configs.getServerConfig().port;
        server.start(port);
    })
    .catch((error: Error) => {
        console.log("Something bad happened!\n" + error);
    });