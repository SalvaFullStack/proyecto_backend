**## API DESIGN**
​

## PERFECTO

```
POST/login {payload: (body)}  (perfecto)
POST/register {payload: (body)}
```

​

### NO ES NECESARIO

```
DELETE/logout
```

​
NO ES NECESARIO EN EL SISTEMA BASADO EN TOKES, ESTA FUNCIONALIDAD SE IMPLEMENTA EN EL LADO DEL CLIENTE BORRANDO EL TOKEN DEL ALMACENAMIENTO LOCAL DEL BROWSER.
​
​

## PERFECTO - SOBRA SORT

​

```
****Public****
​
GET/bands
GET /bands/:bandId
GET/bands?search=nirvana&genre=grunge&sort=date
​
```

Los query params previstos están bien para implementar el filtro por genero y el buscador por nombre de banda, pero el sort no lo está usando tu IU. El endpoint GET /bands devolver la lista ordenada por el criterio que decidas pero el usuario no tiene ningún componente con el que pueda cambiar la configuración de orden, como si tenía mi ejemplo de clase movies-genres.
​

## PERFECTO

​

```
****User****
​
GET/user/favorites
PUT/user/favorites {payload: (body)}
```

​
​

### IMPORTANTE - POST NO NECESITA IDENTIFICAR RECURSO

​ \***\*Admin\*\***
​
POST/bands/:bandId (req.body envía select e input)  
​
Efectivamente toda la data que se enviaría desde el formulario de nueva banda debe llegar en json por body a express.
​
Por lo general cualquier data que en un cliente final se fuese a enviar rellenando un formulario debe pasarse por body.
​
Pero el path del endpoint no necesita identificar ninguna banda. No es necesario pasar ese :bandId por param porque cuando creas un registro nuevo no existe la id de la banda todavía que quieres crear y no necesitas identificar con la id que apsas ningun recurso. Cuando se crea un recurso (POST) solo se necesita indicar al servidor la acción con el verbo y el tipo de recurso que quieres crear con el path `POST /bands`, además de pasar por body en formato json. el payload con todos los datos que necesita el server crear la nueva banda.
​

## PERFECTO

​
PUT/bands/:bandId  
Este está perfecto, en el caso de actualizar si que necesitamos pasarle al servidor la id de la banda que queremos actualizar (:bandId), además del payload con los updates por body en formato json.
​
DELETE/bands/:bandID
Perfecto. En el caso de borrar no necesitamos payload pero si, como haces, pasar la id de la banda para identificar el recurso que solicita el cliente borrar.
​

### NO ENTIENDO EL PROPOSITO DE LOS SIGUIENTES 3

```
POST/genres/:bandId
PUT/genres/:bandId
DELETE/genres/:bandId
```

​
no entiendo que funcionalidad de la app implementan. Es raro identificar con id banda en post put y delete recursos de tipo genero. Entiendo que es un error con los 4 siguientes endpoints queda cubierta el completo la funcionalidad prevista.
​
​
​

### CUIDADO CON LA AUTORIZACIÓN DE RUTAS

GET /genres  
​
​
Este caso que muestra los generos ten en cuenta que debe ser publico porque para hidratar el selector del home con los valores de los generos de la base de dato, que le sirve al usuario para filtrar por genero, el cliente necesita consumir un endpoint publico para hidratar la vista.  
​

## PERFECTO

​
POST /genres {payload: (body)}  
PUT /genres/:genreId {payload: (body)}  
DELETE /genres/:genreId
​
Estos 3 si son funcionalidad especifica de la administración de generos y deben estar protegidos para usuarios con privilegios de administración.

## API DESIGN

POST/login {payload: (body)}
POST/register {payload: (body)}
DELETE/logout
**Public**
GET/bands
GET /bands/:bandId
GET/bands?search=nirvana&genre=grunge
**User**
GET/user/favorites
PUT/user/favorites {payload: (body)}
**Admin**
POST/bands/ (req.body envía select e input)
PUT/bands/:bandId
DELETE/bands/:bandID
GET /genres
POST /genres {payload: (body)}
PUT /genres/:genreId {payload: (body)}
DELETE /genres/:genreId
GET /multimedia
POST /multimedia {payload: (body)}
PUT /multimedia/:multimediaId {payload: (body)}
DELETE /multimedia/:multimediaId
