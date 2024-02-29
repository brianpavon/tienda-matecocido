# Matecocido Cerámica
 Es un sitio web que tiene como objetivo comercializar los productos disponibles de @matecocido.ceramica

 El sitio está desarrollado en Angular(frontend) y el backend usa PHP, con base de datos MySQL.

### Tipos de usuarios
  - anónimo: puede comprar sin registrarse (este perfil por el momento no lo manejamos)
  - cliente: es el usuario que se registró, puede visualizar la página, realizar compras, ver sus ordenes y editar sus datos personales.
  - editor: podría ser el que cargue información para las preguntas frecuentes, sección sobre mí, actualice logo, imágenes en banners, edite info de productos
  - admin: mismo que el editor pero además tiene permiso para crear usuarios, inhabilitar o borrar usuarios, borrar productos, clientes y órdenes de compra  

### Objetivos a realizar

#### Frontend
  Debe contar con un backoffice que deberá ser accesible por los administradores o editores de contenido. 
  
  Las rutas del backoffice deben ser de acceso limitado.

  Debe contar con una página accesible para el público en general, donde se podrá realizar compras, visualizar información, etc.

  En caso de comprar debería no ser necesario registrarse, pero habría que tratar de que se registren, para poder enviar novedades por email, o publicidad.

##### Front de acceso público
 - Componente Login: (/login):
    - Un formulario que permita loguearse por email y contraseña
    - En caso de que la persona que se loguea es administrador, tendría que tener acceso al backoffice
 - Componente Registro: (/register)
    - Un formulario donde se soliciten datos personales
      - Email
      - Contraseña   
      - Nombre
      - Apellido
      - Telefono
      - Calle
      - Altura
      - Piso y Depto (opcional)
      - Código postal
    
- Componete Home: (/home)
   - Debe mostrar el footer y navbar
   - Mostrar todos los productos (puede ser un componente que se reutilice para otras secciones)
   - Al mostrar los productos, si tiene más de una imagen se deben mostrar al estilo carousel
 
- Componente Productos por categoría: (/productos/CODIGO-CATEGORIA)
   - Según el código indicado en la url debe mostrar esos productos
   - Podría ser el mismo html que use el home para mostrar todos los productos
   - Al mostrar los productos, si tiene más de una imagen se deben mostrar al estilo carousel
 
- Componente Producto por código: (/productos/CODIGO-PRODUCTO)
   - Debe mostrar el detalle del producto, con todas las imágenes disponibles
   - Debería mostrar los colores disponibles si hubiera
   - Y al presionar los colores, mostrar la imagen del producto que sea de ese color (al principio esta funcionalidad podríamos obviarla)
   - Tiene que tener un botón de agregar al carrito, con la posibilidad de sumar artículos (habría que validar si hay disponibilidad, según el stock que haya cargado)
  
- Componente Header (navbar)
   - Muestra el nombre de la tienda (debe redirigir al home)
   - Las categorías se deben listar
   - Botón de Login
     - Si tuviera sesión iniciada, se muestra el nombre, y al presionar (podría ser un dropdown) mostrar:
       - Cerrar sesión
       - Editar datos personales
       - Ver compras
   - Botón de carrito (si hubiera productos, mostrar el total)
 
- Componente Footer:
   - Mostrar logos de las redes sociales con redirección
   - Podría tener un link a preguntas frecuentes
   - Contacto
 
- Componente Whatsapp: (a evaluar, no es prioritario)
   - Podría redirigir solamente a enviar un whatsapp
   - Podría abrir una ventana simil chat, donde se puede escribir el mensaje y redirigir al whatsapp

- Componente carrito (/cart):
 - Debe listar los diferentes productos que se hayan agregado, dar la posibilidad de agregar, quitar unidades, o borrar ese producto
 - Tiene la opción de vaciar el carrito
 - Un botón que redirija a pagar

- Componente checkout (/checkout)
  - Si el usuario estuviera logueado, mostrar sus datos. Sino invitarlo a loguear o registrarse.
   - Si no quisiera registrarse, cargar todos los datos
  - Una vez que cargue los datos, mostrar resumen, con la posibilidad de editar esto
  - Mostrar el detalle de los productos, con precio unitario, precio total
  - Mostrar un input para aplicar códigos de descuentos
  - Botón de pagar
   - Por el momento, el botón, confirmaría la compra y guardaría los datos, tendría que enviar un mail y redirigir al detalle de compra con los datos del cbu y el número de orden. (esto hasta implementar la plataforma de pago)
   - Debería redirigir a una plataforma de pago
  

##### Backoffice (/backoffice)
  Sería la sesión donde el administrador puede administrar stock, cargar productos, pedidos, datos de la página etc

  Si no estuviera logueado, debería redirigir al login (podríamos utilizar el mismo login que el público general)

  Evaluar si en material hay templates para esto

  - Debe tener un navbar propio, donde este el logo/nombre de la tienda, que abra en una pestaña nueva el front público de la tienda. Mostrar el nombre de la persona logueada, que al presionar, permita cambiarse datos personales o cerrar sesión.

  Por el momento las opciones, serían:
  - Panel de control:
    - ABM de categorías
    - ABM de colores
    - Cargar CBU
    - Cargar credenciales de plataformas de pago
    - Cargar datos que se necesiten para el correo argentino o el servicio de envío que se elija    
  - Productos:
    - Debe mostrar un botón al inicio para agregar un nuevo producto  
    - Debe mostrar una tabla donde se visualicen los productos, con un resumen de sus características.
    - En cada fila de la tabla, botones al final, que permitan editar o eliminar ese producto. Y un botón para deshabilitarlo
    - Debería tener unos inputs y buscador que permitan filtrar la tabla por los diferentes campos de los productos    
  - Órdenes: (esta sección hay pensarla más y analizar que info mostrar y que debe hacer)
    - Se listan las órdenes de compra de los clientes
    - Permitir marcar ordenes como pagadas y adjuntar los comprobantes si hubiera
  - Clientes:
    - Si es admin, podría crear otros administradores, y clientes
    - Se listan los clientes con sus datos personales
    - Al final de cada fila, debe tener un botón para editar e inhabilitar usuarios
  - Reportes: (evaluar que reportes se podrían necesitar, por el momento solo dejar la opción pero sin función)
  - Secciones: (no es prioritario)
    - Podría contener los links a las redes, número de contacto
    - Cargar el logo de la tienda
    - Permitir cargar un preguntas frecuentes, con sus respuestas
#### Backend
Se deberá desarrollar los diferentes endpoints necesarios para mostrar la información en el front, debiendo validar que los mismos sean accesibles de acuerdo a los permisos establecidos según los perfiles de usuarios.

Manejaremos un JWT, el cual se deberá enviar y validar para acceder a endpoints críticos.

- Usuarios:
  - Altas
  - Login
  - Editar datos
  - Eliminar cuenta (solo inhabilitamos, no borramos de DB)
    
- Productos:
  - Altas
  - Bajas
  - Modificaciones
  - Listar todos los productos
  - Listar productos por categoría
  - Listar producto por código

- Categorías
  - Altas
  - Bajas
  - Modificaciones
  - Listar todas las categorías

- Colores
  - Altas
  - Bajas
  - Modificaciones
  - Listar todos los colores

- Ventas
  - Nueva venta
  - Modificar venta
  - Eliminar venta

- Cargar, modificar y eliminar datos importantes de la tienda
