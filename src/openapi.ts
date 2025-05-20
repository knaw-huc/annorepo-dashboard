export interface paths {
    "/about": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get some info about the server */
        get: operations["getAboutInfo"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get username, api-key for all registered users */
        get: operations["getUsers"];
        put?: never;
        /** @description Add a user */
        post: operations["addUsers"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/users/{userName}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** @description Delete the user with the given userName */
        delete: operations["deleteUser"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/batch/{containerName}/annotations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * @deprecated
         * @description Upload annotations in batch to a given container
         */
        post: operations["postAnnotationsBatch"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/indexes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description List a container's indexes */
        get: operations["getContainerIndexes"];
        put?: never;
        /** @description Add a multi-field index */
        post: operations["addContainerIndex"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Show the users with access to this container */
        get: operations["readContainerUsers"];
        put?: never;
        /** @description Add users with given role to this container */
        post: operations["addContainerUsers"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Find annotations in the given container matching the given query */
        post: operations["createSearch"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/indexes/{indexId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get an index definition */
        get: operations["getContainerIndexDefinition"];
        put?: never;
        post?: never;
        /** @description Delete a container index */
        delete: operations["deleteContainerIndex"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/users/{userName}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** @description Remove the user with the given userName from this container */
        delete: operations["deleteContainerUser"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/fields": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a list of the fields used in the annotations in a container */
        get: operations["getAnnotationFieldsForContainer"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/indexes/{indexId}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get an index status */
        get: operations["getContainerIndexStatus"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/custom-query/{queryCall}/collection": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the AnnotationCollection of the given custom query */
        get: operations["getCustomQueryAnnotationCollection"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/custom-query/{queryCall}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the results of the given custom query */
        get: operations["getCustomQueryResultPage"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/distinct-values/{field}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a list of the fields used in the annotations in a container */
        get: operations["getDistinctAnnotationFieldsValuesForContainer"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/metadata": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get some container metadata */
        get: operations["getMetadataForContainer"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/search/{searchId}/mongo-explain-command": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Show the mongo explain command for the given query */
        get: operations["getMongoExplainForSearch"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/search/{searchId}/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get information about the given search */
        get: operations["getSearchInfo"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/search/{searchId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the given search result page */
        get: operations["getSearchResultPage"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/annotations-batch": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Upload annotations in batch to a given container */
        post: operations["postAnnotationsBatch_1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/services/{containerName}/settings/isReadOnlyForAnonymous": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** @description Turn read-only access to this container for anonymous users on or off */
        put: operations["setAnonymousUserReadAccess"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/global/custom-query": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description List all custom queries */
        get: operations["getCustomQueries"];
        put?: never;
        /** @description Create a custom query */
        post: operations["createCustomQuery"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/global/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Find annotations in accessible containers matching the given query */
        post: operations["createSearch_1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/global/custom-query/{customQueryName}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Read a custom query */
        get: operations["getCustomQuery"];
        put?: never;
        post?: never;
        /** @description Delete a custom query */
        delete: operations["deleteCustomQuery"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/global/custom-query/{customQueryCall}/expand": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Show custom query with parameters filled in */
        get: operations["getExpandedCustomQuery"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/global/search/{searchId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the given global search result page */
        get: operations["getSearchResultPage_1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/global/search/{searchId}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get information about the given global search */
        get: operations["getSearchStatus"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/my/containers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description List all containers the authenticated user has access to, grouped by role */
        get: operations["getAccessibleContainers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/w3c/{containerName}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get an Annotation Container */
        get: operations["readContainer"];
        put?: never;
        /** @description Create an Annotation */
        post: operations["createAnnotation"];
        /** @description Delete an empty Annotation Container */
        delete: operations["deleteContainer"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/w3c": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Create an Annotation Container */
        post: operations["createContainer"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/w3c/{containerName}/{annotationName}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get an Annotation */
        get: operations["readAnnotation"];
        /** @description Update an existing Annotation */
        put: operations["updateAnnotation"];
        post?: never;
        /** @description Delete an Annotation */
        delete: operations["deleteAnnotation"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        AboutInfo: {
            appName: string;
            version: string;
            startedAt: string;
            baseURI: string;
            withAuthentication: boolean;
            sourceCode: string;
            mongoVersion: string;
            grpcHostName: string;
            /** Format: int32 */
            grpcPort: number;
        };
        ContainerUserEntry: {
            userName: string;
            /** @enum {string} */
            role: "GUEST" | "EDITOR" | "ADMIN" | "ROOT";
        };
        CustomQuerySpecs: {
            name: string;
            query: {
                [key: string]: Record<string, never>;
            };
            label?: string;
            description?: string;
            public?: boolean;
        };
        ContainerSpecs: {
            "@context": string[];
            type: string[];
            label: string;
            readOnlyForAnonymousUsers: boolean;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getAboutInfo: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AboutInfo"];
                };
            };
        };
    };
    getUsers: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    addUsers: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    [key: string]: string;
                }[];
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    deleteUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                userName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    postAnnotationsBatch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "*/*": {
                    [key: string]: Record<string, never>;
                }[];
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getContainerIndexes: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    addContainerIndex: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "*/*": {
                    [key: string]: string;
                };
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    readContainerUsers: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    addContainerUsers: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["ContainerUserEntry"][];
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    createSearch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": string;
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getContainerIndexDefinition: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
                indexId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    deleteContainerIndex: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
                indexId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    deleteContainerUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
                userName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getAnnotationFieldsForContainer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getContainerIndexStatus: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
                indexId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getCustomQueryAnnotationCollection: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
                queryCall: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getCustomQueryResultPage: {
        parameters: {
            query?: {
                page?: number;
            };
            header?: never;
            path: {
                containerName: string;
                queryCall: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getDistinctAnnotationFieldsValuesForContainer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
                field: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getMetadataForContainer: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getMongoExplainForSearch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
                searchId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getSearchInfo: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
                searchId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getSearchResultPage: {
        parameters: {
            query?: {
                page?: number;
            };
            header?: {
                "User-Agent"?: string;
            };
            path: {
                containerName: string;
                searchId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    postAnnotationsBatch_1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "*/*": {
                    [key: string]: Record<string, never>;
                }[];
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    setAnonymousUserReadAccess: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "*/*": boolean;
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getCustomQueries: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    createCustomQuery: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["CustomQuerySpecs"];
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    createSearch_1: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": string;
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getCustomQuery: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                customQueryName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    deleteCustomQuery: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                customQueryName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getExpandedCustomQuery: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                customQueryCall: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getSearchResultPage_1: {
        parameters: {
            query?: {
                page?: number;
            };
            header?: never;
            path: {
                searchId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getSearchStatus: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                searchId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    getAccessibleContainers: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    readContainer: {
        parameters: {
            query?: {
                page?: number;
            };
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json;profile=\"http://www.w3.org/ns/anno.jsonld\"": unknown;
                };
            };
        };
    };
    createAnnotation: {
        parameters: {
            query?: never;
            header?: {
                slug?: string;
            };
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/ld+json;profile=\"http://www.w3.org/ns/anno.jsonld\"": string;
                "application/json": string;
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json;profile=\"http://www.w3.org/ns/anno.jsonld\"": unknown;
                };
            };
        };
    };
    deleteContainer: {
        parameters: {
            query?: {
                force?: boolean;
            };
            header?: never;
            path: {
                containerName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json;profile=\"http://www.w3.org/ns/anno.jsonld\"": unknown;
                };
            };
        };
    };
    createContainer: {
        parameters: {
            query?: never;
            header?: {
                slug?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/ld+json;profile=\"http://www.w3.org/ns/anno.jsonld\"": components["schemas"]["ContainerSpecs"];
                "application/json": components["schemas"]["ContainerSpecs"];
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json;profile=\"http://www.w3.org/ns/anno.jsonld\"": unknown;
                };
            };
        };
    };
    readAnnotation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
                annotationName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json;profile=\"http://www.w3.org/ns/anno.jsonld\"": unknown;
                };
            };
        };
    };
    updateAnnotation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
                annotationName: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/ld+json;profile=\"http://www.w3.org/ns/anno.jsonld\"": string;
                "application/json": string;
            };
        };
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json;profile=\"http://www.w3.org/ns/anno.jsonld\"": unknown;
                };
            };
        };
    };
    deleteAnnotation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                containerName: string;
                annotationName: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description default response */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/ld+json;profile=\"http://www.w3.org/ns/anno.jsonld\"": unknown;
                };
            };
        };
    };
}
