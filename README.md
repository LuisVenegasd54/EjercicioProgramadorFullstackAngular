## Mutaciones
Este proyecto realiza validaciones y historial sobre las cadenas de ADN que son mandas para saver si estas resultas con mutaciones geneticas


## Input DNA
En el input de dna se le mandara una cadena de strign separadas con una "," para hacer pasarlo a un arreglo y que este sea enviado al web API a un ruta llamada “/mutation” donde se podrá observar si esta cadena contiene alguna mutación genética o no, este retornara un json de respuesta con la siguiente estructura 

En caso de que no contenga mutación
{
    "statuscode": 200,
    "haserrors": false,
    "data": {
        "mutations": 0
    }
}
	En caso de que contenga mutación
{
    "statuscode": 200,
    "haserrors": false,
    "data": {
        "mutations": 1
    }
}


Caso es pecia donde ocurra un error en la estructura seria la siguiente
{
    "statuscode": 200,
    "haserrors": false,
    "data": "",
    "message": "El contenido no cumple con las bases nitrogenadas estas son  (A,T,C,G), favor de verificar nueva mente."
}
