FROM hugomods/hugo

# Exponer el puerto 1313
EXPOSE 1313
# Instalar Git y otras herramientas útiles
RUN apk add --no-cache \
    git \
    openssh \
    bash \
    curl \
    nodejs \
    npm

# Configuración básica de Git
RUN git config --system core.editor "code --wait" && \
    git config --system init.defaultBranch main && \
    git config --system safe.directory /app

# Directorio de trabajo
WORKDIR /app


# Comando predeterminado
CMD ["hugo", "server", "--bind=0.0.0.0"]