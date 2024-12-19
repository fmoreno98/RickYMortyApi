Proyecto diseñado por Fran Moreno Cazadilla

Este proyecto es una web que llama a la api de Rick y Morty para mostrar los personajes de la serie. Consta de un buscador de personajes, una lista de personajes, un detalle de cada personaje y un modal que tiene la función de ver la coincidencia de los personajes en episodios. 

El proyecto está desarrollado utilizando React, React Router, Bootstrap y Typescript.

Cuando entras en la aplicacción encontrarás un listado de 20 personajes de Rick y Morty. Al hacer click en un personaje te llevará a una página donde podrás ver más información del personaje. En la parte superior de la página encontrarás un buscador que te permitirá buscar personajes por nombre. También encontrarás un botón que te llevará a un modal y mostrará un formulario para buscar personajes por nombre. Al hacer click en el botón de elegir de cada uno de los personajes seleccionará que personaje quieres utilizar. Después de seleccionar el personaje podrás ver la coincidencia de los personajes en episodios al clicar en el botón de buscar coincidencias.

El proyecto está estructurtado en las siguientes carpetas:
- src: Contiene los archivos de la aplicación.
  - components: Contiene los componentes de la aplicación.
- public: Contiene la única foto que se utiliza en la aplicación que no viene de la api.

Archivos:
- App.tsx: Archivo principal de la aplicación que llama a los componentes.
- main.tsx: Archivo principal de la aplicación donde creo el router.
- Buscador.tsx: Componente que contiene el buscador de personajes.
- DetallePersonaje.tsx: Componente que contiene el detalle de cada personaje.
- Tarjeta.tsx: Componente que contiene la tarjeta donde irá una breve información de cada personaje.
- Coinciden.tsx: Componente que contiene el modal donde se muestra la coincidencia de los personajes en episodios.


Mejoras futuras:
- Hacer que funcione bien el filtro de busqueda de personajes.
    Ahora mismo no funciona bien ya que a la hora de buscar el personaje no consigo hacer aparecer los personajes que coinciden con la búsqueda. Debo de estar haciendo algo mal con la llamda a la API.
- No me acaba de convencer el diseño de las tarjetas de los personajes.
    Quiza podría ser un poco más atractivas las trajetas, las veo muy simples.