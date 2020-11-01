import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const [loading, setLoading] = useState(false);

    // const fetchRepositories = async () => {
    // setLoading(true);

    // const response = await fetch('http://localhost:5000/api/repositories');
    // const json = await response.json();
    const response = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });
    console.log("RESPONSE", response);



    // setLoading(false);
    setRepositories(response.data.repositories);
    confirm.log(repositories);
    // };

    // useEffect(() => {
    //     response;
    // }, []);

    return { repositories };
};

export default useRepositories;