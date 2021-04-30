node {
    stage('SCM') {
        checkout scm
    }
    stage('SonarQube Analysis') {
        def scannerHome = tool 'SonarScanner';
        withSonarQubeEnv('SonarQube') {
            sh "${scannerHome}/bin/sonar-scanner"
        }
    }
}

pipeline {
    agent any
    tools {
        nodejs "NodeJS12.22.1"
    }
    stages {
        // stage('Git') {
        //     steps {
        //         git 'https://github.com/1noro/glyph.rat.la'
        //     }
        // }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }  
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}