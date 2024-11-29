# instructions to turn on the api

1. Recomendación: Instalar SQL Server en Docker
Para ejecutar el servidor SQL Server, puedes usar Docker:
# Descargar la imagen de SQL Server
docker pull mcr.microsoft.com/mssql/server
# Ejecutar la instancia de SQL Server en Docker
# - Nombre de la instancia: MSSQLSERVER22DOCKER1
# - Contraseña: SQL#1234
# - Puerto: 1433
docker run --name "MSSQLSERVER22DOCKER1" -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=SQL#1234" -p 1433:1433 -d mcr.microsoft.com/mssql/server

2. Inicializar Base de Datos y Migraciones
2.1 Ejecutar Migraciones
Para inicializar la base de datos con las migraciones necesarias, ejecuta el siguiente comando:
# Ejecutar migraciones para la base de datos
# --project: indica el proyecto de acceso a datos
# --startup-project: indica el proyecto de inicio
dotnet ef database update --project .\ECommerceWeb.DataAccess\ --startup-project .\ECommerceWeb.WebApi

2.2 Usuario Predeterminado
Nombre de usuario: admin
Contraseña: AdminUSer123@
Si prefieres, puedes crear un nuevo usuario utilizando el endpoint de registro.

3. Iniciar el Proyecto
Para iniciar el proyecto, ejecuta el siguiente comando:
# Iniciar la API Web con dotnet watch para observar cambios

dotnet watch run --project ECommerceWeb.WebApi

4. Probar el API
Puedes probar el API utilizando Swagger accediendo a la siguiente URL:

https://localhost:5000/swagger/index.html