# Proyecto NestJS - Web Scraping API

## Descripción
Este proyecto es una API construida con NestJS que implementa técnicas de web scraping para extraer información de diversas fuentes en la web. La API protege el acceso mediante autenticación JWT y roles de usuario.

## Instalación y ejecución

### Requisitos previos
- Node.js (v16 o superior)
- npm o yarn

### Instalación de dependencias
```bash
npm install
```

### Ejecución del proyecto
#### Modo desarrollo
```bash
npm run start:dev
```

#### Modo producción
```bash
npm run build
npm run start:prod
```

## Documentación de Endpoints

### `GET /scraper`
**Descripción:** Realiza scraping en la URL proporcionada y devuelve los datos extraídos. 

**Parámetros de consulta:**
- `url` (string, requerido): URL de la página web a extraer.

**Autenticación:** Requiere un token JWT válido y un rol de usuario (`ADMIN`, `PRO`, `USER`).

**Ejemplo de solicitud:**
```http
GET /scraper?url=https://ejemplo.com
Authorization: Bearer <token>
```

**Ejemplo de respuesta:**
```json
{
  "title": "Título extraído",
  "aditionalInformation": "Información adicional solo visible para PRO y ADMIN",
  "business": "Nombre de la empresa (solo visible para ADMIN)",
  "locationSpecific": "Ubicación específica (solo visible para ADMIN)",
  "publishedDate": "Fecha de publicación (solo visible para ADMIN)"
}
```

## Descripción del Proceso de Web Scraping
El proceso de web scraping implementado en esta API sigue los siguientes pasos:
1. Recibir la URL como parámetro en la consulta.
2. Enviar una solicitud HTTP a la página objetivo.
3. Extraer y estructurar los datos relevantes utilizando `cheerio`.
4. Aplicar restricciones de visualización según el rol del usuario.
5. Guardar la información en la base de datos mediante Supabase.
6. Retornar los datos en formato JSON según los permisos del usuario.

## Contacto
Autor: [Tu Nombre]
Repositorio: [Enlace al repositorio]

