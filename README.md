# Frontend Buscador de Acciones

> [React](https://reactjs.org/) y [React Bootstrap](https://react-bootstrap.github.io) 

## Descripción
App construida con React que consume datos desde [twelvedata](https://api.twelvedata.com/) y desde API desarrollada con .NET donde se alojan usuarios y acciones favoritas. Permite buscar, filtrar y graficar la cotización de las acciones, y Ofrece las opciones de búsqueda histórica, o bien la actualización en tiempo real de los valores de cotización de cada acción.  
- Probar performance con el símbolo "nflx", las demás acciones no está disponible con el plan de la apiKey utilizada.
- Tanto la apiKey como las URLs se encuentran en el archivo .env, que no fue incluido en el .gitignore.

## Instalación
Sigue los pasos a continuación para instalar el proyecto:

1. Posicionado en el directorio que desee clone el repositorio con: 

```bash
git clone https://github.com/lucasfrontend/realtime-stock-grapher-front
```
2. Navegue hasta posicionarse en el directorio del proyecto: 

```bash
cd realtime-stock-grapher-front
```

3. Instale las dependencias: `npm install`
```bash
npm install
```

4. Corra el siguiente comando para levantar el proyecto de forma local
```bash
npm run start
```

Podrá visualizar el frontend en [http://localhost:3000/](http://localhost:3000/). 
El consumo a la API desarrollada con .NET apuntará a  [localhost:5144/](localhost:5144).
Asegúrese de que dichos puertos no estén siendo utilizados por otros procesos.
