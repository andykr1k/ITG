import Foundation
import AppIntents
import SwiftUI

@available(iOS 16.0, *)
struct GetGoalsIntent: AppIntent {
    static var title: LocalizedStringResource = "Get My Goals"
    static var description = IntentDescription("Retrieves your current goals from ITG app")
    static var openAppWhenRun: Bool = false
    
    // Perform the intent action
    func perform() async throws -> some IntentResult & ProvidesDialog & ShowsSnippetView {
        // Hardcoded list of goals
        let goals = [
            "Learn Swift programming",
            "Complete marathon training",
            "Read 12 books this year",
            "Build a mobile app",
            "Improve work-life balance"
        ]
        
        // Return the result with dialog and snippet
        return .result(
            dialog: "You have \(goals.count) goals: \(goals.joined(separator: ", "))",
            view: GoalsSnippetView(goals: goals)
        )
    }
}

// Snippet view to display goals in a nice format
@available(iOS 16.0, *)
struct GoalsSnippetView: View {
    let goals: [String]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Your Goals")
                .font(.headline)
                .foregroundColor(.primary)
            
            ForEach(Array(goals.enumerated()), id: \.offset) { index, goal in
                HStack(alignment: .top, spacing: 8) {
                    Text("\(index + 1).")
                        .font(.body)
                        .foregroundColor(.secondary)
                    Text(goal)
                        .font(.body)
                        .foregroundColor(.primary)
                }
            }
        }
        .padding()
    }
}

// Make the intent discoverable by Siri
@available(iOS 16.0, *)
struct GetGoalsIntentAppShortcutsProvider: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: GetGoalsIntent(),
            phrases: [
                "Get my goals in \(.applicationName)",
                "Show my goals in \(.applicationName)",
                "What are my goals in \(.applicationName)",
                "List my goals in \(.applicationName)",
                "Get my current goals"
            ],
            shortTitle: "Get Goals",
            systemImageName: "target"
        )
    }
    
    static var shortcutTileColor: ShortcutTileColor = .blue
}

