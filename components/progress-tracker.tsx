"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, BookOpen, TrendingUp } from "lucide-react"

export function ProgressTracker() {
  const achievements = [
    { name: "Budget Master", description: "Completed budgeting fundamentals", earned: true },
    { name: "Investment Rookie", description: "Started first investment course", earned: true },
    { name: "Goal Setter", description: "Set 3 financial goals", earned: false },
    { name: "Consistency King", description: "7-day learning streak", earned: false },
  ]

  const goals = [
    { name: "Emergency Fund", target: 5000, current: 2500, unit: "$" },
    { name: "Investment Portfolio", target: 10000, current: 3200, unit: "$" },
    { name: "Credit Score", target: 750, current: 680, unit: "" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Track Your <span className="text-primary">Progress</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Monitor your learning journey and celebrate milestones as you build your financial expertise.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Learning Progress */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Learning Progress
              </CardTitle>
              <CardDescription>Your journey through our financial education modules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Completion</span>
                  <span className="text-sm text-primary font-bold">32%</span>
                </div>
                <Progress value={32} className="h-3" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Budgeting Basics</span>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    Complete
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Investment Fundamentals</span>
                  <span className="text-sm text-muted-foreground">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Emergency Fund Strategy</span>
                  <span className="text-sm text-muted-foreground">Not Started</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-accent" />
                Achievements
              </CardTitle>
              <CardDescription>Badges earned through your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.earned ? "bg-accent/20" : "bg-muted"
                    }`}
                  >
                    <Trophy className={`w-5 h-5 ${achievement.earned ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}>
                      {achievement.name}
                    </div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Financial Goals */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-chart-2" />
                Financial Goals
              </CardTitle>
              <CardDescription>Track your real-world financial progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{goal.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {goal.unit}
                        {goal.current.toLocaleString()} / {goal.unit}
                        {goal.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    <div className="flex items-center text-sm text-chart-2">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {Math.round((goal.current / goal.target) * 100)}% Complete
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
