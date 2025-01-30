# Continuous Deployment

## Was ist Continuous Deployment und wie wird es umgesetzt?
Continuous Deployment ist eine Strategie in der Softwareentwicklung, bei der Code-
Änderungen nach erfolgreichem Bestehen aller automatisierten Tests direkt in die
Produktionsumgebung überführt werden. Dies erfordert eine CI/CD-Pipeline mit
automatisierten Tests, Monitoring und Deployment-Tools wie Jenkins, GitLab CI/CD oder
GitHub Actions. ([TechTarget](https://www.techtarget.com/searchitoperations/definition/continuous-deployment))

## Unterschied zwischen Continuous Deployment und Continuous Delivery
- **Continuous Delivery**: Der Code ist jederzeit bereit für ein Release, die Freigabe
  erfolgt jedoch manuell.
- **Continuous Deployment**: Jede erfolgreich getestete Änderung wird automatisch
  ausgeliefert, ohne manuelle Freigabe. ([Atlassian](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment))

## Vor- und Nachteile von Continuous Delivery & Continuous Deployment

### **Continuous Delivery**
**Vorteile:**
- Regelmässige, kleinere Releases → stabiler & kontrollierter
- Automatisierte Tests verbessern die Softwarequalität
- Manuelle Kontrolle über Releases

**Nachteile:**
- Hoher Wartungsaufwand für Test- & Staging-Umgebungen
- Längere Release-Zyklen durch manuelle Genehmigung



### **Continuous Deployment**
**Vorteile:**
- Automatische Bereitstellung → schnell & effizient
- Direktes Nutzerfeedback durch schnelle Releases
- Kein Stress durch „grosse Releases“

**Nachteile:**
- Höheres Risiko durch fehlende manuelle Kontrolle
- Erfordert starke Automatisierung & Monitoring
- Unternehmen müssen sich an neue Prozesse anpassen

([Katalon Blog](https://katalon.com/resources-center/blog/continuous-delivery-vs-continuous-deployment))

## Deployment-Strategien

### **Blue/Green Deployment**
- Zwei identische Umgebungen (Blue = aktiv, Green = neue Version)
- Traffic wird nach erfolgreichem Test auf Green umgeleitet
- Ermöglicht einfaches Rollback ([TechTarget](https://www.techtarget.com/searchitoperations/definition/blue-green-deployment))

### **Canary Deployment**
- Neue Version wird schrittweise an kleine Nutzergruppe ausgeliefert
- Bei Erfolg erfolgt die vollständige Veröffentlichung
- Reduziert das Risiko von Fehlern ([Google Cloud](https://cloud.google.com/deploy/docs/deployment-strategies/canary?hl=de))

## Was ist A/B Testing?
- Zwei Varianten einer Anwendung werden parallel getestet
- Ziel: Nutzerreaktionen analysieren, um die bessere Version zu identifizieren ([Optimizely](https://www.optimizely.com/optimization-glossary/ab-testing/))

## Was sind Feature Toggles?
- Ermöglichen das Ein-/Ausschalten von Features ohne erneutes Deployment
- Sinnvoll für Tests, graduelles Rollout oder Beta-Features ([Martin Fowler](https://martinfowler.com/articles/feature-toggles.html))

## Was sind Rollback-Strategien?
- **Versionierung:** Zurücksetzen auf eine vorherige Software-Version
- **Blue/Green-Switch:** Umschalten auf vorherige Umgebung
- **Datenbank-Snapshots:** Wiederherstellung eines früheren Stands ([AppMaster](https://appmaster.io/de/glossary/rollback-strategie-fur-die-bereitstellung))

## Continuous Monitoring
- Permanente Überwachung von Anwendungen auf Fehler & Performance-Probleme
- Tools: Prometheus, Grafana, ELK-Stack, Datadog ([New Relic](https://docs.newrelic.com/whats-new/2023/06/whats-new-06-13-wpm/))

## Sichere Passwort-Speicherung
- Verwendung von **bcrypt, scrypt oder Argon2** zur sicheren Hashing
- Salt und Pepper-Techniken gegen Rainbow-Table-Angriffe
- Keine Klartext-Passwörter speichern ([OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html))

## Arten von Deployment
- **Container-basiert:** Docker, Kubernetes ([Docker](https://www.docker.com/))
- **Serverless:** AWS Lambda, Azure Functions ([AWS](https://aws.amazon.com/lambda/))
- **Direkt auf Server:** Code-Kompilierung und Deployment via SSH ([Deploybot](https://deploybot.com/blog/the-easiest-way-to-deploy-your-app-through-ssh-and-git))
- **PaaS:** Plattformbasierte Bereitstellung (z. B. Heroku, AWS Elastic Beanstalk) ([Heroku](https://www.heroku.com/))

---