pipeline {
  agent any
  stages {
    stage('Development') {
      parallel {
        stage('Development') {
          steps {
            echo 'Test Pipeline !'
            fileExists 'docker-compose.yml'
          }
        }

        stage('stage A') {
          steps {
            echo 'Hello from Stage A'
          }
        }

      }
    }

  }
}