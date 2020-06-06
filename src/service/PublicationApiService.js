import axios from 'axios';

const PUBLICATION_API_BASE_URL = 'http://localhost:8080/publications';

class PublicationApiService {

    fetchPublications() {
        return axios.get(PUBLICATION_API_BASE_URL);
    }

    fetchPublicationById(publicationId) {
        return axios.get(PUBLICATION_API_BASE_URL + '/' + publicationId);
    }

    fetchPublicationByTitle(publicationTitle) {
        return axios.get(PUBLICATION_API_BASE_URL + '/title?title=' + publicationTitle);
    }

    addPublication(publication) {
        return axios.post(""+PUBLICATION_API_BASE_URL, publication);
    }

    deletePublication(publicationId) {
        return axios.delete(PUBLICATION_API_BASE_URL + '/' + publicationId);
    }

    editPublication(publication) {
        return axios.put(PUBLICATION_API_BASE_URL + '/' + publication.id, publication);
    }

}

export default new PublicationApiService();