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
                allOf {
                    fileExists(file: 'docker-compose.yml') 
                }
            }
            steps {
                echo 'Docker compose file Found !!!'
                echo 'printing compose file: '
                sh 'cat docker-compose.yml'
            }
        }

      }
    }

  }
}