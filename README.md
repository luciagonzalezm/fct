# Aplicación web elaborada durante el período de FCT
El objetivo de dicha aplicación es crear un desarrollo web que simule el funcionamiento de la página de una empresa en la que existen una serie de departamentos, administradores, supervisores y usuarios.
# Pasos para crear el servidor
Empleando **Swagger Editor**, un editor, donde en formato **YAML** podemos codificar el esqueleto de una **API REST**, definimos los modelos de un departamento, un administrador, un supervisor y un usuario, así como los métodos POST, GET, PUT y DELETE de cada uno de ellos. 

Por otro lado, creamos un login para administradores, otro para supervisores y otro para usuarios con los campos usuario, contraseña y rol.
Tras definir la estructura en formato **YAML** de la **API REST** en el **Swagger Editor**, generamos un nuevo servidor de **Node.js**. Una vez descargado el mismo, se 
descomprime la carpeta obtenida y se abre en Visual Studio Code para realizar un **npm install** de manera que se descarguen las dependencias necesarias para montar el servidor (carpeta **node-modules**). Dentro de la carpeta api del servidor generado, encontramos el archivo **swagger.yaml** con el que hemos estado trabajando desde el editor, realizamos una serie de cambios en el host y los schemes para que funcione al servirlo en local.

Finalmente, codificamos los servicios de nuestro servidor para poder realizar las **peticiones HTTP** de cada uno de los modelos creados desde el cliente web. Además, configuraramos las **CORS** en el servidor con un paquete de **npm** para ello.

Para lanzar el servidor debemos usar el comando **npm start**.
# Cliente web con Angular
Generamos un nuevo proyecto con **Angular**, para ello en primer lugar, comprobamos que tenemos instalado: un IDE en el que desplegar dicho proyecto (en este caso **Visual Studio Code**), **Node.js** y **Angular CLI**.

Comenzamos codificando el cliente web para aplicar funcionalidad al hacer el login tanto como administrador, como supervisor o como usuario. Así mismo, se implementan validaciones al formulario de acceso utilizando **Template-driven forms** y se añadieron  los mensajes de error si el acceso al sistema no era correcto. Para proteger las rutas si no estás dado de alta en el sistema de usaron guardas de tipo **CanActivate**.

Utilizando **CSS** y **Bootstrap**, se diseña una página de inicio y una serie de dashboard que permitieran realizar un **CRUD** de los departamentos, los adminitradores, los supervisores y los usuarios. Los formularios de creación y modificación incluyen vlidaciones con **Template-driven forms**.

Mediante el uso de guardas se aplican los permisos de acceso correspondientes a cada rol de los empleados. Además, se implementa una nueva funcionalidad para que, si accedes al login y ya estás logueado, te salte un aviso en el cual puedes hacer logout o continuar con la sesión que está iniciada.

Como nueva tarea complementaria, se nos pidió modificar desde **Swagger Editor**, el modelo de departamentos para incluir la propiedad numEmpleados. Se añadió desde 
**Angular** la funcionalidad para que al crear un departamento el número de empleados sea inicialmente 0. Por otro lado, se realizaron las modificaciones necesarias en el código para que se sumen los diferentes empleados de cada rol que se creen nuevos a dicho departamento, se resten los empleados que son eliminados del departamento y, también, se resten los que cambian a otro departamento y se sumen en el nuevo departamento. De igual manera, se añadió una restricción para no poder borrar los departamentos a los que pertenezca algún empleado.

Se realizaron pruebas y se verificó que no tenía sentido crear empleados con nombre de usuario o email repetidos. Por ello, se hizo un GET por cada tipo de empleado para consultarlos todos y antes de modificar o añadir un nuevo empleado, se comprueba si en un array que almacena a todos los empleados del sistema existe alguno con el nombre de usuario o el email a modificar/añadir.

Seguidamente, se indica que los supervisores deben poder crear encuestas. Cada una de ellas contiene un id, un título, una descripción y un array con el número de preguntas que indique el supervisor, siempre entre 10 y 20.

Se crean dos formularios para realizar la encuesta: uno para añadir el título y la descripción y, el otro, para ir añadiendo preguntas con su enunciado y sus 
respuestas. Para ello, se crea una nueva clase Pregunta con los atributos: enunciado, respuesta1, resultado1, respuesta2, resultado2, respuesta3 y resultado3. 

Desde el controlador del componente de la encuesta, se gestiona que se puedan ir insertando en un array las preguntas que se necesiten e incluso agregar nuevas una vez finalizado el formulario, cada una de ellas como un nuevo objeto de la clase Pregunta.

Por otro lado, es necesario crear en **Angular** una nueva clase Encuesta con los campos que se han indicado y en el controlador del componente encuesta se gestiona que se creen el número de preguntas indicadas por el supervisor y una vez creadas todas ellas se pueda guardar la encuesta como un nuevo objeto de la clase Encuesta que acabamos de crear con todos los campos necesarios.

Las preguntas de la encuesta pueden ser tanto modificadas como eliminadas, por tanto, en **Swagger Editor** añadimos un modelo para las preguntas y otro para las encuestas, además de codificar los paths para realizar las acciones deseadas sobre dichos modelos. Dentro del servidor, configuramos los servicios para que dichas acciones se puedan ejecutar.

En el cliente, se implementaron los servicios para realizar las peticiones al servidor para guardar, consultar, modificar y eliminar preguntas y 
encuestas y una guarda para que solo los supervisores puedan crear/consultar las encuestas. 

En último lugar, en el controlador del componente encuesta se utilizaron los métodos de dichos servicios para guardar 
los datos en el servidor. También, en un nuevo componente se permitió visualizar las encuestas creadas y consultar todos los datos de cada una.
# Licencia
El software ha sido desarrollado bajo la licencia GPL3 por Lucía González.
