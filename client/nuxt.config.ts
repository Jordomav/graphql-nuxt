const config = {
    mode: 'universal',
    modules: ['@nuxtjs/apollo'],
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: 'http://localhost:4000',
            }
        }
    },
};

export default config;
