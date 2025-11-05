import routesTesk from "./taskRoutes.ts";

const routes = (app)=>{
    app.route('/').get((req, res)=>{
    const mensage="Bem Vindo, a este lindo servidor."
    res.status(200).send(mensage);
});
app.use(routesTesk)
    
}
export default routes;