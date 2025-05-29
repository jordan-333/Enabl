"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, X, Plus, Timer } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CreateSessionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateSessionModal({ open, onOpenChange }: CreateSessionModalProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("09:00")
  const [duration, setDuration] = useState<{ hours: string; minutes: string }>({ hours: "1", minutes: "00" })
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState<string>("")
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  const [selectedIndividuals, setSelectedIndividuals] = useState<string[]>([])

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleTeamChange = (value: string) => {
    if (!selectedTeams.includes(value)) {
      setSelectedTeams([...selectedTeams, value])
    }
  }

  const handleIndividualChange = (value: string) => {
    if (!selectedIndividuals.includes(value)) {
      setSelectedIndividuals([...selectedIndividuals, value])
    }
  }

  const handleRemoveTeam = (team: string) => {
    setSelectedTeams(selectedTeams.filter((t) => t !== team))
  }

  const handleRemoveIndividual = (individual: string) => {
    setSelectedIndividuals(selectedIndividuals.filter((i) => i !== individual))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Create Training Session</DialogTitle>
          <DialogDescription>Set up a new training session.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 overflow-y-auto pr-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Session Title</Label>
            <Input id="title" placeholder="Enter session title" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="agenda">Agenda</Label>
            <Textarea id="agenda" placeholder="Describe the session agenda and objectives" rows={2} />
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <div className="flex items-center gap-1">
                  <Timer className="mr-1 h-4 w-4 text-muted-foreground" />
                  <Select value={duration.hours} onValueChange={(value) => setDuration({ ...duration, hours: value })}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="H" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 8 }, (_, i) => i).map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {hour}h
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-muted-foreground">:</span>
                  <Select
                    value={duration.minutes}
                    onValueChange={(value) => setDuration({ ...duration, minutes: value })}
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="M" />
                    </SelectTrigger>
                    <SelectContent>
                      {["00", "15", "30", "45"].map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}m
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Invite Teams</Label>
            <Select onValueChange={handleTeamChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Teams</SelectLabel>
                  <SelectItem value="sales">Sales Team</SelectItem>
                  <SelectItem value="setters">Setters</SelectItem>
                  <SelectItem value="closers">Closers</SelectItem>
                  <SelectItem value="account-managers">Account Managers</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {selectedTeams.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedTeams.map((team) => (
                  <Badge key={team} variant="secondary" className="flex items-center gap-1">
                    {team === "sales"
                      ? "Sales Team"
                      : team === "setters"
                        ? "Setters"
                        : team === "closers"
                          ? "Closers"
                          : "Account Managers"}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTeam(team)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Invite Individuals</Label>
            <Select onValueChange={handleIndividualChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select individuals" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Team Members</SelectLabel>
                  <SelectItem value="john-doe">John Doe (Setter)</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith (Closer)</SelectItem>
                  <SelectItem value="alex-johnson">Alex Johnson (Setter)</SelectItem>
                  <SelectItem value="sarah-williams">Sarah Williams (Closer)</SelectItem>
                  <SelectItem value="michael-brown">Michael Brown (Manager)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {selectedIndividuals.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedIndividuals.map((individual) => (
                  <Badge key={individual} variant="secondary" className="flex items-center gap-1">
                    {individual === "john-doe"
                      ? "John Doe"
                      : individual === "jane-smith"
                        ? "Jane Smith"
                        : individual === "alex-johnson"
                          ? "Alex Johnson"
                          : individual === "sarah-williams"
                            ? "Sarah Williams"
                            : "Michael Brown"}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveIndividual(individual)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <Button type="button" size="icon" onClick={handleAddTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Create Session</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
