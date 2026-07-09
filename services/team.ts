import {httpClient} from '@/services/http'

export const teamService = {
    async getTeams() {
        return await httpClient.get('/teams');
    },

};