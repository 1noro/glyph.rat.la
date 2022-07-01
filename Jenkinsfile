// node {
//     stage('SCM') {
//         checkout scm
//     }
//     stage('SonarQube Analysis') {
//         def scannerHome = tool 'SonarScanner';
//         withSonarQubeEnv('SonarQube') {
//             sh "${scannerHome}/bin/sonar-scanner"
//         }
//     }
// }

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'make docker/setup'
            }
        }  
        stage('Test') {
            steps {
                sh 'make docker/test'
            }
        }
    }
}
