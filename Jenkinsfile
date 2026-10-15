// El pipeline de la aplicación de tareas. No sabe nada de Angular: ejecuta las mismas órdenes
// que en local lanza `npm run verificar`, repartidas en etapas.
// Orientativo: el agente y los pasos junit y archiveArtifacts dependen de cada Jenkins.
pipeline {
  agent {
    docker { image 'node:22' }
  }
  options {
    timeout(time: 15, unit: 'MINUTES')
  }
  stages {
    stage('Instalar') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Formato y tipos') {
      steps {
        sh 'npx prettier --check src'
        sh 'npm run test:tipos'
      }
    }
    stage('Tests') {
      steps {
        sh 'npm run test:ci'
      }
      post {
        always {
          junit 'informes/junit.xml'
        }
      }
    }
    stage('Build') {
      steps {
        sh 'npx ng build'
      }
    }
  }
  post {
    success {
      archiveArtifacts artifacts: 'dist/tareas/browser/**', fingerprint: true
    }
  }
}
