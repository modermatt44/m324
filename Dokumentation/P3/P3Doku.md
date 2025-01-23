# CI Pipeline Vergleich

Dieser Bericht vergleicht unsere aktuelle CI-Pipeline mit GitHub Actions mit einer alternativen Lösung mit der GitLab CI/CD.

## Aktuelle Implementierung: GitHub Actions

- **Trigger**: Läuft bei Pushes auf `develop`, `main`, `release/*` und bei Pull Requests gegen `main` und `develop`.
- **Schritte**:
    1. Checkout des Codes
    2. Node.js 18.x Setup
    3. Installation der Abhängigkeiten (`npm install`)
    4. Build (`npm run build`)
    5. Unit Tests (`npm test`)
    6. Integration Tests (`npm run integration-tests`)

### Vorteile
- **Einfachheit**: Nahtlose GitHub-Integration.
- **Transparenz**: Direkt neben dem Code sichtbar.

### Nachteile
- **Anpassung**: Weniger flexibel als einige Alternativen.

## Alternative Lösung: GitLab CI/CD

- **Schritte**: Ähnlich wie bei GitHub Actions, jedoch in GitLab integriert.

### Vorteile
- **Flexibilität**: Mehr Anpassungsmöglichkeiten.
- **Kosten**: Oft kostengünstiger.

### Nachteile
- **Komplexität**: Einrichtung kann schwieriger sein.
- **UI**: Weniger intuitiv für einige Benutzer.

## Fazit

GitHub Actions ist ideal für unser aktuelles Setup dank der einfachen Integration und da wir Github nutzen und nicht Gitlab
