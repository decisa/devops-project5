pipeline {
  agent any
  stages {
        stage('Development') {
            parallel {
                stage('Development') {
                    steps {
                        echo 'Test Pipeline !'
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
                    }
                    when { not { expression { fileExists(file: 'docker-compose2.yml') } } }
                    steps {
                        echo 'Docker compose file NOT found !!! this is not a multi-container app.'
                    }
                }



            }
        }

  }
}