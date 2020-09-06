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
                }

                stage('Docker test') {
                    when { not { expression { fileExists(file: 'docker-compose2.yml') } } }
                    steps {
                        echo 'Docker compose file NOT found !!! this is not a multi-container app.'
                        script {
                            def fields = env.getEnvironment()
                            fields.each {
                                key, value -> println("${key} = ${value}");
                            }
                            println(env.PATH)
                        }
                    }
                }
            }
        }
    }
}