pipeline {
    agent any
    options { buildDiscarder(logRotator(numToKeepStr: '5')) }
    environment {
        REBUILD_FRONT_END = true
        REBUILD_DB_SERVICE = true
        REBUILD_DB_IMAGE = true
        AWS_DEPLOY = true
        AWS_ROLLING_UPDATE_FRONTEND = false
        AWS_ROLLING_UPDATE_FRONTEND_V = 'v1.1.0'

        FRONT_END_BUILD = 'v1.2.0'
        FRONT_END_IMAGE_NAME = 'front-end'

		DB_SERVICE_NAME = 'todo-service'
		DB_SERVICE_BUILD = 'v1.0.2'

        DB_IMAGE_NAME = "todo-service-db"
        DB_IMAGE_BUILD = 'v1.0.0'
        
        DOCKER_USERNAME = 'decisa'
        K8S_CLUSTER_NAME = "capstone-cluster"
        // K8S_CLUSTER_NAME = "eksctl-capstone-dev-stack"
    }
    stages {
        stage('Lint') {
            steps {
                sh  '''
                        make lint
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
                    when {
						expression {
							env.REBUILD_FRONT_END.toBoolean() == true
						}
            		}
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
                    when {
						expression {
							env.REBUILD_DB_SERVICE.toBoolean() == true
						}
            		}
					steps {
							sh '''
								echo "building db service docker image"
								cd ${DB_SERVICE_NAME}
								docker build -t ${DOCKER_USERNAME}/${DB_SERVICE_NAME}:${DB_SERVICE_BUILD} -t ${DOCKER_USERNAME}/${DB_SERVICE_NAME}:latest .
								docker images
							'''
					}
				}

                stage('Build MySQL Docker Image') {
                    when {
						expression {
							env.REBUILD_DB_IMAGE.toBoolean() == true
						}
            		}
					steps {
							sh '''
								echo "building MySQL docker image"
								cd ${DB_IMAGE_NAME}
								docker build -t ${DOCKER_USERNAME}/${DB_IMAGE_NAME}:${DB_IMAGE_BUILD} -t ${DOCKER_USERNAME}/${DB_IMAGE_NAME}:latest .
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
                    when {
						expression {
							env.REBUILD_DB_SERVICE.toBoolean() == true
						}
            		}
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
                stage('Upload DB Image to Docker Hub') {
                    when {
						expression {
							env.REBUILD_DB_IMAGE.toBoolean() == true
						}
            		}
					steps {
						withCredentials([usernamePassword(credentialsId: 'art-docker', usernameVariable: 'DOCKER_USR', passwordVariable: 'DOCKER_PWD')]) {
							sh '''
								echo $DOCKER_PWD | docker login -u="$DOCKER_USR" --password-stdin
								docker push ${DOCKER_USERNAME}/${DB_IMAGE_NAME}:${DB_IMAGE_BUILD}
								docker push ${DOCKER_USERNAME}/${DB_IMAGE_NAME}:latest
							'''
						}
					}
				}
			}
		}

        stage('Deploy App to AWS ') {
            when {
                expression {
                    env.AWS_DEPLOY.toBoolean() == true
                }
            }
            steps {
                withAWS(credentials: 'art-aws', region: 'us-west-2') {
                    sh "aws eks --region us-west-2 update-kubeconfig --name ${K8S_CLUSTER_NAME}"
                    echo "Deploying Backend : MySQL server + DB API server "
                    sh "kubectl apply -f backend.yml"
                    echo "Deploying Frontend : Build version of React App + Loadbalancer "
                    sh "kubectl apply -f frontend.yml"
                    sh "kubectl get all"
                }
            }
        }
        
        stage('Rolling Update of FrontEnd App: AWS ') {
            when {
                expression {
                    env.AWS_ROLLING_UPDATE_FRONTEND.toBoolean() == true
                }
            }
            steps {
                withAWS(credentials: 'art-aws', region: 'us-west-2') {
                    sh "aws eks --region us-west-2 update-kubeconfig --name ${K8S_CLUSTER_NAME}"
                    echo "Starting rolling update for frontend app"
                    sh "kubectl set image deployment.apps/frontend frontend=${DOCKER_USERNAME}/${FRONT_END_IMAGE_NAME}:${AWS_ROLLING_UPDATE_FRONTEND_V}"
                    sh "kubectl rollout status deployment.apps/frontend"
                    sh "kubectl get all"
                }
            }
        }
    }

}