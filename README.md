# Conversor de Divisas

Aplicación web para convertir divisas en tiempo real utilizando React y la API de Exchange Rates.

## Características

- Conversión en tiempo real de divisas
- Interfaz responsive para móviles y escritorio
- Actualización dinámica sin recargar la página
- Gestión de errores y estados de carga
- Soporte para múltiples monedas

## Tecnologías Utilizadas

- React 18
- Vite (Package Bundler)
- Tailwind CSS
- Axios para peticiones HTTP
- Exchange Rates API

## Requisitos Cumplidos

### 1. Consumo de Datos de API Externa
- Implementación de peticiones asíncronas usando Axios
- Gestión de errores con mensajes informativos
- Actualización en tiempo real de los tipos de cambio

### 2. Interfaz de Usuario
- Diseño responsive usando Tailwind CSS
- Actualización dinámica usando React useState y useEffect
- Componentes reutilizables y modulares

### 3. Package Bundler
- Configuración de Vite para desarrollo y producción
- Optimización de assets y código
- Hot Module Replacement para desarrollo

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/juan1969gudrul/proyecto-divisas.git
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Despliegue

El proyecto está desplegado en GitHub Pages. Para desplegar nuevos cambios:

1. Construir el proyecto:
   ```bash
   npm run build
   ```

2. Desplegar a GitHub Pages:
   ```bash
   npm run deploy
   ```

URL del proyecto: https://juan1969gudrul.github.io/proyecto-divisas/

## Control de Versiones

El proyecto utiliza Git para el control de versiones, con los siguientes commits principales:

1. Implementación de consumo de API externa y gestión de errores
2. Implementación de interfaz de usuario responsive con Tailwind CSS
3. Implementación de actualización dinámica de la interfaz con React
4. Configuración de Vite como package bundler
5. Documentación y configuración de despliegue
