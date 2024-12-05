# T4 - Theorie CI

## Was ist Continuous Integration (CI) und wie wird es umgesetzt?

Continuous Integration (CI) ist ein Entwicklungsansatz, bei dem Entwickler regelmäßig ihren Code in ein gemeinsames
Repository integrieren. Dieser Prozess wird automatisiert und umfasst das Kompilieren, Testen und Bereitstellen des
Codes. Durch CI können Teams frühzeitig Fehler erkennen und beheben, die Codequalität verbessern und die
Softwarebereitstellung beschleunigen.
<br>
Quelle: [Ionos](https://www.ionos.de/digitalguide/websites/web-entwicklung/continuous-integration/)

## Was sind die Vor- und Nachteile von CI?

### Vorteile:

- Früherkennung von Fehlern
- Verbesserte Codequalität
- Schnellere Bereitstellung von Software
- Bessere Zusammenarbeit im Team

### Nachteile:

- Initialer Aufwand für die Einrichtung
- Abhängigkeit von automatisierten Tests
- Risiko von Build-Fehlern


## Was ist Continuous Testing und wie wird es umgesetzt?

Continuous Testing ist ein Prozess, bei dem automatisierte Tests in den CI/CD-Pipeline integriert werden. Diese Tests
überprüfen den Code auf Funktionalität, Leistung und Sicherheit. Durch kontinuierliches Testen können Teams frühzeitig
Fehler erkennen und die Softwarequalität sicherstellen.

## Was ist eine Branching Strategie und welches sind die bekannten?

Eine Branching-Strategie definiert, wie und wann Branches im Versionskontrollsystem erstellt und zusammengeführt werden.
Bekannte Branching-Strategien sind:

- Feature Branching
- Gitflow
- Trunk-Based Development
- Release Branching
- Environment Branching
- Mainline
- Forking
- Centralized Workflow

## Wie kann man Commits und Branches mit User Stories verknüpfen?

Mit einem einheitlichen Namensschema für Commits und Branches können diese mit User Stories verknüpft werden. Zum
Beispiel kann der Branch-Name die User Story-ID enthalten und die Commit-Nachricht auf die entsprechende User Story
verweisen. Dies erleichtert die Nachverfolgbarkeit und Dokumentation der Entwicklung.

## Welche Merge Strategien gibt es und wie werden sie umgesetzt?

Es gibt verschiedene Merge-Strategien, wie z.B. Merge, Rebase, Squash, Fast-Forward, etc. Diese werden je nach
Anwendungsfall und Branching-Strategie eingesetzt. Beispielsweise wird bei der Gitflow-Strategie ein Merge-Commit
verwendet, um die Feature-Branches in den Develop-Branch zu integrieren.

## Was ist Semantic Versioning und wie wird es umgesetzt?

Semantic Versioning ist ein Schema zur Nummerierung von Softwareversionen, das auf der Bedeutung von Änderungen basiert.
Es besteht aus drei Zahlen: Major, Minor und Patch. Major-Versionen für inkompatible Änderungen, Minor-Versionen für
abwärtskompatible Änderungen und Patch-Versionen für abwärtskompatible Fehlerbehebungen. Semantic Versioning wird in der
Regel in der Datei `package.json` oder `pom.xml` festgelegt.

## Welchen Unterschied haben Mono- und Multirepo (speziell im Zusammenhang mit Microservices)?

Ein Monorepo enthält den gesamten Code eines Unternehmens oder Projekts in einem einzigen Repository. Ein Multirepo
hingegen verwendet separate Repositories für verschiedene Teile des Codes. Bei Microservices-Architekturen wird oft ein
Multirepo-Ansatz verwendet, um die Unabhängigkeit und Skalierbarkeit der Services zu gewährleisten. Ein Monorepo kann
jedoch Vorteile wie eine einheitliche Versionsverwaltung und bessere Code-Sharing-Möglichkeiten bieten.

## Was ist eine Artifact-Repository und welche Rolle spielt es in Ihrem Prozess?

Ein Artifact-Repository ist ein Speicherort für Binärdateien, Artefakte und Abhängigkeiten, die im Entwicklungsprozess
verwendet werden. Es dient als zentraler Ort für den Zugriff auf und die Verwaltung von Artefakten, z.B. Bibliotheken,
Paketen oder Konfigurationsdateien. Im Prozess spielt das Artifact-Repository eine wichtige Rolle bei der Bereitstellung
von Artefakten für die CI/CD-Pipeline und die Softwarebereitstellung.
