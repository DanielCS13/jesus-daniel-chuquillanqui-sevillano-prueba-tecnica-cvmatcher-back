# Proyecto NestJS - Web Scraping API

## Descripción
Este proyecto es una API construida con NestJS que implementa técnicas de web scraping para extraer información de Laborum. La API protege el acceso mediante autenticación JWT y roles de usuario.

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

### API URL
```https
https://prueba-tecnica-gj4il5q5n-daniels-projects-6c98c0df.vercel.app/
```

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

### `GET /scraper/stored-data`
**Descripción:** Obtiene los datos almacenados en Supabase y los filtra según el rol del usuario.

**Autenticación:** Requiere un token JWT válido y un rol de usuario (`ADMIN`, `PRO`, `USER`).

**Ejemplo de solicitud:**
```http
GET /scraper/stored-data
Authorization: Bearer <token>
```

**Ejemplo de respuesta:**
Para un usuario con rol `USER`.
```json
[
  {
    "title": "Oferta de trabajo 1"
  },
  {
    "title": "Oferta de trabajo 2"
  }
]
```

Para un usuario con rol `PRO`.
```json
[
  {
    "title": "Oferta de trabajo 1",
    "aditionalInformation": "Requisitos y detalles adicionales"
  },
  {
    "title": "Oferta de trabajo 2",
    "aditionalInformation": "Requisitos y detalles adicionales"
  }
]
```

Para un usuario con rol `ADMIN`.
```json
[
  {
    "title": "Oferta de trabajo 1",
    "aditionalInformation": "Requisitos y detalles adicionales",
    "business": "Empresa XYZ",
    "locationSpecific": "Lima, Perú",
    "publishedDate": "2024-09-02"
  },
  {
    "title": "Oferta de trabajo 2",
    "aditionalInformation": "Requisitos y detalles adicionales",
    "business": "Empresa ABC",
    "locationSpecific": "Buenos Aires, Argentina",
    "publishedDate": "2024-09-01"
  }
]
```

## Tokens de Prueba
Estos tokens pueden utilizarse para probar la API con diferentes roles:

- **Admin:**
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.HXdcgO56yFXViBolaA2tOvtDtiV9uPnNBqZHygF7kpI
  ```
- **Pro:**
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InBybyIsImlhdCI6MTUxNjIzOTAyMn0.RDElf3xubgRdy-gPFY-46unRLbsTz0qTvtXA_yJmfNY
  ```
- **User:**
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9._YQB2RpRLoT5xPCKI8xbYds9EBwnF4odLprpyABQDLM
  ```

## URLs de prueba
Puedes probar la API con las siguientes URLs de ejemplo:

- https://www.laborum.pe/job/Caja-de-Pensiones-Militar-Policial/ASISTENTE-DE-TESORERIA-DE-CONT/6792051f025c7277f624b363
- https://www.laborum.pe/job/Caja-de-Pensiones-Militar-Policial/ANALISTA-DE-CALIFICACION-PREVI/6793569e025c7277f62511c9
- https://www.laborum.pe/job/Caja-de-Pensiones-Militar-Policial/PRACTICANTE-PROFESIONAL-GERENC/6792051f025c7277f624b39b

## Descripción del Proceso de Web Scraping
El proceso de web scraping implementado en esta API sigue los siguientes pasos:
1. Recibir la URL como parámetro en la consulta.
2. Enviar una solicitud HTTP a la página objetivo.
3. Extraer y estructurar los datos relevantes utilizando `cheerio`.
4. Aplicar restricciones de visualización según el rol del usuario.
5. Guardar la información en la base de datos mediante Supabase.
6. Retornar los datos en formato JSON según los permisos del usuario.

## Contacto
- Autor: Jesús Daniel Chuquillanqui Sevillano
- Repositorio: https://github.com/DanielCS13/jesus-daniel-chuquillanqui-sevillano-prueba-tecnica-cvmatcher-back
- API en Vercel: https://prueba-tecnica-gj4il5q5n-daniels-projects-6c98c0df.vercel.app/
