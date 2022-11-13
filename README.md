# BSale_FrontEnd
Cliente del desafio

El cliente esta compuesto por un dropdown en la navbar superior donde se puede elegir la categoria de los productos a mostrar, ademas de las categorias  
traidas por la base de datos, existe una personalizada que es para mostrar todos los productos existentes, en el mismo navbar a la derecha  
hay un input para buscar productos, esta busqueda es parcial (es decir que no es necesario que la busqueda sea exacta) y esta atada al contexto de la categoria  
esto quiere decir que si en la categoria de ron buscamos "Monster", no podra encontrar ninguno ya que en esa categoria no existe ese product  
lo que sucedera en caso de no encontrar es que se mantendran los productos que se cargaron desde la categoria, la busqueda es case insensitive para mejorar la experiencia de usuario y por defecto se ordenan alfabeticamente de forma ascendente los productos.
