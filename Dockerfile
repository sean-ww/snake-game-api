FROM node:10-alpine

# Add required dependencies
RUN apk add --no-cache \
        python \
        make \
        g++ \
        bash \
        bash-completion \
    # Create workdir
    && mkdir -p /var/www

COPY . /var/www

WORKDIR /var/www

EXPOSE 4040

CMD ["npm", "start"]
