# D2: Branching Strategie und Semantic Versioning

# Branching Strategie

## Überblick der Branching-Strategie

Unsere gewählte Branching-Strategie basiert auf der Feature Branching Methode, um eine saubere, flexible und skalierbare Zusammenarbeit zu gewährleisten. Diese Strategie ermöglicht eine parallele Entwicklung von Features, schnelle Bugfixes und eine geordnete Release-Verwaltung. Sie wird kontinuierlich überarbeitet, sobald neue Anforderungen wie CI/CD Pipelines, Code Reviews oder branch-spezifische Tests hinzukommen.



## Definition der Branch-Typen und Verwendungszwecke

![Feature-Branching](/res/branches.png)

#### Global Naming Convention: [type]/[issueId]-[Name].
Aufgrund der verschiedenen Branch-Typen wird der Typ des Branches am Anfang definiert. Für die Zuordnung zu einem Github Issue verwenden wir die issueId im Branch-Namen. Für eine grobe Beschreibung des Branches beinhaltet der Branch-Name ebenfalls eine Kurzbeschreibung.

### 1. Main Branch
- Beschreibung: Enthält die stabile und produktionsfähige Version des Codes.

- Schutzmechanismen:
    - Write Protection: Direkte Commits sind nicht erlaubt.

    - Verpflichtender Code Review vor jedem Merge.

    - Automatisierte CI-Pipeline (Überprüfung auf Tests, Linter-Checks, Sicherheitsprüfungen).

- Verwendungszweck:

    - Bereitstellung der produktiven Version.

    - Integration von Hotfixes und Releases.

- Merge-Wege: Nur über Pull Requests von Release oder Hotfix Branches.

### 2. Development Branch

- Beschreibung:

    - Dieser Branch dient als Integrationsebene für alle Features, bevor sie in Main gelangen.

    - Enthält die aktuellste Version aller Features, die in Arbeit oder abgeschlossen sind.

- Schutzmechanismen:

    - Direkte Commits nicht erlaubt.

    - Nur getestete und freigegebene Pull Requests von Feature oder Bugfix Branches.

- Verwendungszweck:

    - Vorbereitung auf Releases oder zur Integration mehrerer Features.

    - Durchlauf der CI-Pipeline (Build, Unit Tests, Integrationstests).

- Merge-Wege: Pull Requests von Feature oder Bugfix Branches.

### 3. Feature Branches

- Beschreibung: Jeder Feature Branch enthält die Implementierung eines spezifischen Features oder einer Aufgabe.

- Naming Convention: feature/[issueId]-[featureName].

- Verwendungszweck: Entwicklung von neuen Features isoliert vom Main Code.

- Schutzmechanismen:

    - Feature Branches werden lokal erstellt und getestet.

    - CI-Pipeline prüft Syntax, Linter und Unit Tests.

- Merge-Wege: Nach erfolgreicher Entwicklung wird ein Pull Request in Development oder direkt in Main gestellt.

### 4. Bugfix Branches

- Beschreibung: Zur Behebung von spezifischen Fehlern im Code, die während der Entwicklung oder QA entdeckt wurden.

- Naming Convention: bugfix/[issueId]-[bugName].

- Verwendungszweck:

    - Fehlerbehebung ohne den Main Code zu blockieren.

    - Integration in Development oder Main, je nach Dringlichkeit.

- Schutzmechanismen:

    - Verpflichtende CI-Pipeline (Tests und Linter).

    - Code Reviews vor jedem Merge.

- Merge-Wege: Pull Request in Development oder in dringenden Fällen direkt in Main.

### 5. Hotfix Branches

- Beschreibung: Für kritische Fehlerbehebungen in der produktiven Version.

- Naming Convention: hotfix/[issueId]-[hotfixName].

- Verwendungszweck:

    - Sofortige Fehlerkorrekturen auf der produktiven Umgebung.

    - Integration zurück in Main und Synchronisation mit Development.

- Schutzmechanismen:

    - CI-Pipeline und Review vor dem Merge in Main.

Merge-Wege: Direkter Merge in Main und nachträglicher Merge in Development.

### 6. Release Branches

- Beschreibung: Zur Vorbereitung und Stabilisierung eines Releases.

- Naming Convention: release/1.2.0.

- Verwendungszweck:

    - Endgültige Tests und Bugfixes vor dem Produktionsrelease.

    - Versionierung und Dokumentation der Änderungen.

- Schutzmechanismen:

    - CI-Pipeline prüft umfassend Tests (Unit, Integration, End-to-End).

    - Pull Requests müssen Reviews durchlaufen.

- Merge-Wege: Wird nach Fertigstellung in Main gemergt.

## Regeln für Merges
- Pull Requests (PR):

    - Jeder Merge erfolgt über PRs.

    - PRs müssen einen erfolgreichen Durchlauf der CI-Pipeline haben.

    - PRs müssen mindestens einen genehmigten Code Review enthalten.

- Merge-Strategien:

    - Squash & Merge: Für Feature Branches, um die Git-Historie sauber zu halten.

    - Rebase & Merge: Bei Bugfixes, um eine lineare Historie zu gewährleisten.

    - Merge Commit: Für Release oder Hotfix Branches, um die Branch-Struktur nachvollziehbar zu halten.

- Automatisierungen:

- Die CI/CD-Pipeline enthält Tests, Build-Prozesse, Sicherheitsüberprüfungen und Deployments.

### Naming Conventions

Branch-Namen folgen einem klaren Schema, das die Identifikation erleichtert:
| Branch-Typ   | Format  | Beispiel |
|--------------|---------------------------|-----------------------|
| Feature      | feature/ | feature/4-new-button|
| Bugfix       | bugfix/  | bugfix/7-fix-crash  |
| Hotfix       | hotfix/  | hotfix/9-fix-db-leak|
| Release      | release/ | release/1.0.0       |
| Main         | main     | main                |
| Development  | develop  | develop             |

## Anwendungsbeispiele

### Neues Feature entwickeln

1. Ein neuer Task wird erstellt (z. B. Ticket-ID: 123).

2. Entwickler erstellt einen Branch: feature/123-login-page.

3. Code wird implementiert und lokal getestet.

4. CI-Pipeline wird ausgeführt, um Syntax und Tests zu prüfen.

5. Pull Request wird gestellt, Reviews und Pipeline müssen bestanden sein.

6. Merge in develop.

### Kritischer Hotfix umsetzen

1. Ein Fehler in der Produktion wird entdeckt.

2. Branch: hotfix/9-fix-api-bug wird erstellt.

3. Fehlerbehebung erfolgt direkt auf Grundlage des main Branches.

4. CI-Pipeline wird ausgeführt, um die Änderung zu prüfen.

5. Merge direkt in main.

6. Änderungen werden in develop synchronisiert.

### Release vorbereiten

1. Entwicklungsphase abgeschlossen, Release Branch release/1.2.0 wird erstellt.

2. Endgültige Tests und kleinere Bugfixes werden hier vorgenommen.

3. Nach Fertigstellung wird der Branch in main gemergt und getaggt.

4. Optional: Automatisiertes Deployment wird ausgelöst.

5. Release Branch wird in develop gemergt.

## Vorteile dieser Strategie

Isolation: Jede Entwicklung erfolgt isoliert, wodurch Konflikte minimiert werden.

Flexibilität: Parallele Entwicklung von Features und Bugfixes.

Transparenz: Klare Historie und Nachvollziehbarkeit aller Änderungen.

Skalierbarkeit: Strategie kann leicht an wachsende Teams oder komplexere Projekte angepasst werden.

# Semantic Versioning
## Definition der Versionsstruktur

Für die Versionierung wird Semantic Versioning verwendet, mit dem Format MAJOR.MINOR.PATCH. Die Bedeutung der einzelnen Segmente ist wie folgt:

- MAJOR: Wird erhöht, wenn es inkompatible Änderungen gibt, die wesentliche Teile der Anwendung betreffen.

- MINOR: Wird erhöht, wenn neue Features hinzugefügt werden, die abwärtskompatibel sind.

- PATCH: Wird erhöht, wenn Fehlerbehebungen oder kleinere Änderungen vorgenommen werden.

Beispiele:

- 1.0.0: Erste stabile Version der Anwendung.

- 1.1.0: Neues Feature wurde hinzugefügt.

- 1.1.1: Bugfix oder kleinere Verbesserung ohne neue Features.

![SemanticVersioning](/res/semanticVersioning.png)

## Zusammenhang mit der Branching-Strategie

Die Versionierung erfolgt zusammen mit den Release- und Hotfix-Prozessen:

1. Feature Branches:

    - Während der Entwicklung eines Features wird keine Version vergeben.

    - Nach Merge in develop wird die nächste mögliche MINOR-Version vorbereitet.

2. Release Branches:

    - Der Release Branch enthält die Zielversion, z. B. release/1.2.0.

    - Vor dem Merge in main wird ein Tag mit der entsprechenden Version erstellt (z. B. v1.2.0).

3. Hotfix Branches:

    - Hotfix Branches erhalten sofort eine neue PATCH-Version.

    - Beispiel: Ein kritischer Fehler in 1.2.0 wird in 1.2.1 behoben und getaggt.

4. Main Branch:

    - Der main Branch repräsentiert immer die aktuellste Version in Produktion. Alle Tags werden hier erstellt.

## Anwendungsbeispiele

### 1. Entwicklung eines neuen Features:

- Feature Branch: feature/7-new-feature

- Nach Merge in develop: Zielversion wird 1.1.0

- Nach Merge in main: Tag v1.1.0

### 2. Behebung eines kritischen Fehlers:

- Hotfix Branch: hotfix/2-critical-fix

- Nach Merge in main: Neue Version 1.1.1, Tag v1.1.1

### 3. Release vorbereiten:

- Release Branch: release/1.2.0

- Nach Abschluss: Merge in main und Tag v1.2.0

## Vorteile dieser Strategie

- Konsistenz: Klare Struktur für Versionsnummern und Branching.

- Nachvollziehbarkeit: Jede Änderung ist einer Version zugeordnet.

- Flexibilität: Ermöglicht die gleichzeitige Arbeit an Features, Bugfixes und Hotfixes.

- Erweiterbarkeit: Kann leicht an komplexere Anforderungen angepasst werden.