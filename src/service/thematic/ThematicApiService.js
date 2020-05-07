import axios from 'axios';

const THEMATIC_API_BASE_URL = 'http://localhost:8080/thematic';

class ThematicApiService {

    fetchThemes() {
        return axios.get(THEMATIC_API_BASE_URL);
    }

    fetchThematicById(thematicId) {
        return axios.get(THEMATIC_API_BASE_URL + '/' + thematicId);
    }

    addThematic(thematic) {
        return axios.post(""+THEMATIC_API_BASE_URL, thematic);
    }

    deleteThematic(thematicId) {
        return axios.delete(THEMATIC_API_BASE_URL + '/' + thematicId);
    }

    editThematic(thematic) {
        return axios.put(THEMATIC_API_BASE_URL + '/' + thematic.id, thematic);
    }

}

export default new ThematicApiService();