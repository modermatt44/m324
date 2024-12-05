### **1. Was ist Continuous Integration (CI) und wie wird es umgesetzt?**
Continuous Integration (CI) ist die Praxis, Codeänderungen häufig in ein zentrales Repository zu integrieren, wobei jede Integration durch automatisierte Builds und Tests überprüft wird. Dies minimiert Integrationsprobleme und fördert Qualität. Umsetzung erfolgt durch Nutzung von Versionskontrollsystemen, Automatisierungstools und regelmässigen Tests.  
[Link: Atlassian](https://www.atlassian.com/de/continuous-delivery/continuous-integration)
 
---
 
### **2. Was sind die Vor- und Nachteile von CI?**
**Vorteile:**  
- Frühzeitige Fehlererkennung  
- Verbesserte Softwarequalität  
- Schnellere Entwicklungszyklen  
 
**Nachteile:**  
- Hoher initialer Aufwand  
- Wartungsaufwand für Tests und Pipelines  
[Link: IONOS](https://www.ionos.de/digitalguide/websites/web-entwicklung/continuous-integration/)
 
---
 
### **3. Was ist Continuous Testing und wie wird es umgesetzt?**
Continuous Testing ist die kontinuierliche Durchführung von automatisierten Tests während des gesamten Entwicklungsprozesses, um Qualität zu gewährleisten. Umsetzung durch Testautomatisierung, Integration in CI/CD-Pipelines und Nutzung geeigneter Testumgebungen.  
[Link: Tricentis](https://www.tricentis.com/de/learn/was-ist-continuous-testing)
 
---
 
### **4. Was ist eine Branching-Strategie und welche sind die bekannten?**
Branching-Strategien legen fest, wie Entwicklungszweige verwaltet werden. Bekannte Strategien:  
- **Git-Flow:** Strukturierte Trennung von Feature, Release und Hotfix-Branches  
- **GitHub Flow:** Leichtgewichtige, kontinuierliche Integration mit kurzen Feature-Branches  
- **Trunk-Based Development:** Direktes Arbeiten am Hauptzweig mit minimalen Branches  
[Link: Atlassian](https://www.atlassian.com/de/agile/software-development/branching)
 
---
 
### **5. Wie kann man Commits und Branches mit User Stories verknüpfen?**
Durch Verwendung von Referenzen in Commit-Nachrichten (z. B. „Fixes #123“) oder durch Tools wie GitHub, die Commits direkt mit User Stories in Projektmanagementtools verknüpfen können.  
[Link: Medium](https://medium.com/@abedmaatalla/how-to-link-github-commits-branches-to-github-issues-7afadef13971)
 
---
 
### **6. Welche Merge-Strategien gibt es und wie werden sie umgesetzt?**
- **Fast-Forward:** Einfacher Merge ohne neue Commits  
- **Three-Way-Merge:** Kombiniert Änderungen beider Branches mit neuem Merge-Commit  
- **Squash-Merge:** Vereint mehrere Commits zu einem einzigen  
- **Rebase-Merge:** Behält eine lineare Historie bei  
[Link: Atlassian](https://www.atlassian.com/de/git/tutorials/using-branches/merge-strategy)
 
---
 
### **7. Was ist Semantic Versioning und wie wird es umgesetzt?**
Semantic Versioning verwendet das Format MAJOR.MINOR.PATCH.  
- **MAJOR:** Rückwärtsinkompatible Änderungen  
- **MINOR:** Neue, kompatible Features  
- **PATCH:** Fehlerbehebungen  
Umgesetzt durch klare Richtlinien und CI/CD-Pipelines.  
[Link: semver.org](https://semver.org/)
 
---
 
### **8. Welchen Unterschied haben Mono- und Multirepo (speziell im Zusammenhang mit Microservices)?**
- **Monorepo:** Ein zentrales Repository für alle Microservices, fördert Wiederverwendbarkeit, aber schwieriger zu skalieren.  
- **Multirepo:** Jedes Microservice hat ein eigenes Repository, bietet bessere Isolation, aber höhere Komplexität bei der Verwaltung.  
[Link: Medium](https://medium.com/@maoberlehner/monorepos-in-the-wild-33c6eb246cb9)
 
---
 
### **9. Was ist ein Artifact-Repository und welche Rolle spielt es in Ihrem Prozess?**
Ein Artifact-Repository (z. B. JFrog Artifactory) speichert Build-Artefakte wie Binärdateien oder Docker-Images. Es unterstützt die Verteilung von Artefakten in CI/CD-Pipelines und gewährleistet Versionierung und Konsistenz.  
[Link: Jetbrains](https://www.jetbrains.com/de-de/teamcity/ci-cd-guide/concepts/artifact-repository/)
