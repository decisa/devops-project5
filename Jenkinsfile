pipeline {
    agent any
    environment {
        REBUILD_FRONT_END = true
        FRONT_END_BUILD = 'v1.0.4'
        FRONT_END_IMAGE_NAME = 'front-end'
		DB_SERVICE_NAME = 'todo-service'
		DB_SERVICE_BUILD = 'v1.0.0'
        DOCKER_USERNAME = 'decisa'
    }
    stages {
        stage('Checkout') {
            steps {
                sh  '''
                        pwd
                        ls -al
                    '''
            }
        }
        stage('Build Front End') {
            when {
                expression {
                    env.REBUILD_FRONT_END.toBoolean() == true
                }
            }
            
            stages {
                stage('Build React App') {
                    steps {
                        sh '''
                            cd front-end
                            yarn set version berry
                            yarn install
                            yarn build
                            cat ./build/index.html
                            echo "current work directory:"
                            pwd
                        '''
                    }
                }             
            }
        }

        stage('Build Docker Images') {
			parallel {
				stage('Build Front-End Docker Image') {
					steps {
							sh '''
								echo "building front end docker image"
								cd ${FRONT_END_IMAGE_NAME}
								docker build -t ${DOCKER_USERNAME}/${FRONT_END_IMAGE_NAME}:${FRONT_END_BUILD} -t ${DOCKER_USERNAME}/${FRONT_END_IMAGE_NAME}:latest .
								docker images
							'''
					}
				}

				stage('Build DB Service Docker Image') {
					steps {
							sh '''
								echo "building db service docker image"
								cd ${DB_SERVICE_NAME}
								docker build -t ${DOCKER_USERNAME}/${DB_SERVICE_NAME}:${DB_SERVICE_BUILD} -t ${DOCKER_USERNAME}/${DB_SERVICE_NAME}:latest .
								docker images
							'''
					}
				}
			}
        }

		stage('Upload to Docker Hub') {
			parallel {
				stage('Upload Front-End to Docker Hub') {
					when {
						expression {
							env.REBUILD_FRONT_END.toBoolean() == true
						}
            		}
					steps {
						withCredentials([usernamePassword(credentialsId: 'art-docker', usernameVariable: 'DOCKER_USR', passwordVariable: 'DOCKER_PWD')]) {
							sh '''
								echo $DOCKER_PWD | docker login -u="$DOCKER_USR" --password-stdin
								docker push ${DOCKER_USERNAME}/${FRONT_END_IMAGE_NAME}:${FRONT_END_BUILD}
								docker push ${DOCKER_USERNAME}/${FRONT_END_IMAGE_NAME}:latest
							'''
						}
					}
				}
				stage('Upload DB Service to Docker Hub') {
					steps {
						withCredentials([usernamePassword(credentialsId: 'art-docker', usernameVariable: 'DOCKER_USR', passwordVariable: 'DOCKER_PWD')]) {
							sh '''
								echo $DOCKER_PWD | docker login -u="$DOCKER_USR" --password-stdin
								docker push ${DOCKER_USERNAME}/${DB_SERVICE_NAME}:${DB_SERVICE_BUILD}
								docker push ${DOCKER_USERNAME}/${DB_SERVICE_NAME}:latest
							'''
						}
					}
				}
			}
		}
    }
}