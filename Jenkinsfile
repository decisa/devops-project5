pipeline {
    agent any
    stages {
        stage('Checkout') {
            // input {
            //     message "Should we continue?"
            //     ok "Yes, we should."
            //     submitter "alice,bob"
            //     parameters {
            //         string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
            //     }
            // }
            steps {
                sh  '''
                        pwd
                        ls -al
                    '''
            }
        }
        stage('Build') {
            parallel {
                stage('Build React App') {
                    steps {
                        sh '''
                            cd front-end
                            yarn set version berry
                            sudo yarn build
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
                            pwd
                        '''
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