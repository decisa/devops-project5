pipeline {
    agent any
    environment {
        FRONT_END_VERSION = 'v1.0.4'
        FRONT_END_IMAGE_NAME = 'front-end'
        DOCKER_USERNAME = 'decisa'
        REBUILD_FRONT_END = true
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
                stage('Build Docker Image') {
                    steps {
                        sh '''
                            echo "building docker image"
                            cd front-end
                            docker build -t ${DOCKER_USERNAME}/${FRONT_END_IMAGE_NAME}:${FRONT_END_VERSION} -t ${DOCKER_USERNAME}/${FRONT_END_IMAGE_NAME}:latest .
                            docker images
                        '''
                    }
                }
                stage('Upload to Docker Hub') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'art-docker', usernameVariable: 'DOCKER_USR', passwordVariable: 'DOCKER_PWD')]) {
                            // available as an env variable, but will be masked if you try to print it out any which way
                            // note: single quotes prevent Groovy interpolation; expansion is by Bourne Shell, which is what you want
                            sh 'echo $DOCKER_PWD'
                            // also available as a Groovy variable
                            echo DOCKER_USR
                            echo DOCKER_PWD
                            // or inside double quotes for string interpolation
                            echo "username is $DOCKER_USR"
                            sh '''
                                echo $DOCKER_PWD | docker login -u="$DOCKER_USR" --password-stdin
                                docker push ${DOCKER_USERNAME}/${FRONT_END_IMAGE_NAME}:${FRONT_END_VERSION}
                                docker push ${DOCKER_USERNAME}/${FRONT_END_IMAGE_NAME}:latest
                            '''
                        }
                    }
                }

                stage('Docker Compose') {
                    when {
                        expression {
                            fileExists(file: 'docker-compose.yml') 
                        }
                    }
                    steps {
                        echo 'Docker compose file Found !!!'
                        echo 'printing compose file: '
                        sh 'cat docker-compose.yml'
                        sh 'docker --version'
                        sh 'docker ps'
                    }
                }

                stage('Docker test') {
                    when { not { expression { fileExists(file: 'docker-compose2.yml') } } }
                    steps {
                        echo 'Docker compose file NOT found !!! this is not a multi-container app.'
                        sh "printenv"
                    }
                }
            }
        }

        // stage ('Docker') {
        //     agent {
        //         dockerfile {
        //             dir 'front-end'
        //             additionalBuildArgs  '--build-arg version=1.0.0'
        //             args "-v ./front-end/nginx/config:/etc/nginx -p 80:80"
        //         }
        //     }
        //     steps {
        //         sh "ls"
        //         sh "cd /etc/nginx && ls"
        //     }
        // }
    }
}