// const { Sequelize } = require("sequelize");
module.exports = {
    up: (queryInstance, Sequelize) => {
        return queryInstance.bulkInsert('todos', [
            {
                id: 1,
                description: "Create React todo App",
                completed: true,
                completedOn: new Date('2020-08-28 21:22:27'),
                sortOrder: 1,
                createdAt: new Date('2020-08-22 10:00:45'),
                updatedAt: new Date('2020-08-22 10:00:45')
            },{
                id: 2,
                description: 'Upload to github',
                completed: true,
                completedOn: new Date('2020-08-23 12:11:59'),
                sortOrder: 2,
                createdAt: new Date('2020-08-22 10:06:20'),
                updatedAt: new Date('2020-08-23 12:11:59')
            },{
                id: 3,
                description: 'Deploy the App to AWS',
                completed: false,
                completedOn: null,
                sortOrder: 3,
                createdAt: new Date('2020-08-22 10:08:19'),
                updatedAt: new Date('2020-08-22 10:08:19')
            },{
                id: 4,
                description: 'Add focus on task edit',
                completed: true,
                completedOn: new Date('2020-08-28 21:22:31'),
                sortOrder: 4,
                createdAt: new Date('2020-08-23 11:09:27'),
                updatedAt: new Date('2020-08-28 21:22:31')
            },{
                id: 5,
                description: 'Add Express.js backend routing',
                completed: true,
                completedOn: new Date('2020-08-28 21:22:30'),
                sortOrder: 5,
                createdAt: new Date('2020-08-27 23:50:45'),
                updatedAt: new Date('2020-08-28 21:22:30')
            },{
                id: 20,
                description: 'Add MySQL database to persist data',
                completed: true,
                completedOn: new Date('2020-08-28 21:17:29'),
                sortOrder: 6,
                createdAt: new Date('2020-08-28 21:17:07'),
                updatedAt: new Date('2020-08-28 21:17:29')
            },{
                id: 21,
                description: 'Containerize the App',
                completed: false,
                completedOn: null,
                sortOrder: 7,
                createdAt: new Date('2020-08-28 21:17:11'),
                updatedAt: new Date('2020-08-28 21:17:11')
            },
            {
                id: 22,
                description: 'Upload images to Docker Hub',
                completed: false,
                completedOn: null,
                sortOrder: 7,
                createdAt: new Date('2020-08-28 21:45:20'),
                updatedAt: new Date('2020-08-28 21:45:20')
            },
            {
                id: 23,
                description: 'Add Jenkins',
                completed: false,
                completedOn: null,
                sortOrder: 8,
                createdAt: new Date('2020-08-28 21:45:44'),
                updatedAt: new Date('2020-08-28 21:45:44')
            },
            {
                id: 24,
                description: 'Add Linting code pipeline',
                completed: false,
                completedOn: null,
                sortOrder: 9,
                createdAt: new Date('2020-08-28 21:45:55'),
                updatedAt: new Date('2020-08-28 21:45:55')
            },
            {
                id: 25,
                description: 'Build a docker container inside pipeline',
                completed: false,
                completedOn: null,
                sortOrder: 10,
                createdAt: new Date('2020-08-28 21:46:06'),
                updatedAt: new Date('2020-08-28 21:46:06')
            },
            {
                id: 26,
                description: 'Docker container is deployed to K8s cluster',
                completed: false,
                completedOn: null,
                sortOrder: 11,
                createdAt: new Date('2020-08-28 21:46:45'),
                updatedAt: new Date('2020-08-28 21:46:45')
            },
            {
                id: 27,
                description: 'Add blue/green or rolling deployment',
                completed: false,
                completedOn: null,
                sortOrder: 12,
                createdAt: new Date('2020-08-28 21:47:41'),
                updatedAt: new Date('2020-08-28 21:47:41')
            },
            {
                id: 28,
                description: 'Extra: add additional pipelines other than linting',
                completed: false,
                completedOn: null,
                sortOrder: 13,
                createdAt: new Date('2020-08-28 21:48:11'),
                updatedAt: new Date('2020-08-28 21:48:11')
            },
            {
                id: 29,
                description: 'Extra: Perform security scanning of Docker containers',
                completed: false,
                completedOn: null,
                sortOrder: 14,
                createdAt: new Date('2020-08-28 21:48:38'),
                updatedAt: new Date('2020-08-28 21:48:38')
            },
            {
                id: 30,
                description: 'Extra: Post deployment testing of your application',
                completed: false,
                completedOn: null,
                sortOrder: 15,
                createdAt: new Date('2020-08-28 21:49:02'),
                updatedAt: new Date('2020-08-28 21:49:02')
            },
            {
                id: 32,
                description: 'this is a no longer completed task 2',
                completed: true,
                completedOn: new Date('2020-08-30 16:56:28'),
                sortOrder: 16,
                createdAt: new Date('2020-08-30 15:37:12'),
                updatedAt: new Date('2020-08-30 16:56:28')
            }
        ]);
    },

    down: (queryInstance, Sequelize) => {
        return queryInstance.bulkDelete('todos', null, {});
    }
}