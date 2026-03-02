import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Modal,
  Dropdown,
  Tooltip,
  ToastContainer,
  toast,
  Input,
  Select,
  Tabs,
  ThemeProvider,
  useThemeStore,
} from "@/lib/ovie-ui";
import {
  Sun,
  Moon,
  ChevronDown,
  Settings,
  User,
  LogOut,
  Mail,
  Download,
  Heart,
  Star,
  Copy,
  Trash2,
  ArrowRight,
  Search,
  Lock,
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";

const LogoContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 2px solid #a69802;
  overflow: hidden;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <button
      onClick={toggleTheme}
      className="rounded-md border border-border p-2 text-foreground hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</h3>
      {children}
    </div>
  );
}

function ColorSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`h-12 w-12 rounded-lg border border-border ${className}`} />
      <span className="text-2xs text-muted-foreground">{name}</span>
    </div>
  );
}

const selectOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular", disabled: true },
];

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <ToastContainer />

        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">O</span>
              </div> */}
              <LogoContainer>
                <Logo src="/logo.png" alt="Ovie UI Logo" />
              </LogoContainer>
              <div>
                <span className="text-lg font-semibold text-foreground tracking-tight">ovie-ui</span>
                <span className="ml-1.5 text-xs text-muted-foreground font-mono">/core</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                v1.0.0
              </span>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="container py-12 space-y-16 max-w-4xl">
          {/* Hero */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground tracking-tight sm:text-5xl">
              @ovie-ui/core
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A clean, accessible, and scalable design system built with React, TypeScript, and Tailwind CSS.
              No unnecessary abstractions. Just solid components.
            </p>
          </div>

          {/* Color Tokens */}
          <Section title="Color Tokens">
            <div className="flex flex-wrap gap-4">
              <ColorSwatch name="primary" className="bg-primary" />
              <ColorSwatch name="secondary" className="bg-secondary" />
              <ColorSwatch name="accent" className="bg-accent" />
              <ColorSwatch name="muted" className="bg-muted" />
              <ColorSwatch name="destructive" className="bg-destructive" />
              <ColorSwatch name="background" className="bg-background" />
              <ColorSwatch name="foreground" className="bg-foreground" />
              <ColorSwatch name="border" className="bg-border" />
            </div>
          </Section>

          {/* Typography */}
          <Section title="Typography">
            <div className="space-y-3 rounded-lg border border-border bg-card p-6">
              <p className="text-4xl font-bold text-card-foreground">Heading 1</p>
              <p className="text-2xl font-semibold text-card-foreground">Heading 2</p>
              <p className="text-xl font-medium text-card-foreground">Heading 3</p>
              <p className="text-base text-card-foreground">Body text — Inter, clean and readable.</p>
              <p className="text-sm text-muted-foreground">Secondary text — muted for supporting content.</p>
              <p className="text-xs font-mono text-muted-foreground">Code — JetBrains Mono for technical content.</p>
            </div>
          </Section>

          {/* Buttons */}
          <Section title="Button">
            <SubSection label="Variants">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </SubSection>
            <SubSection label="Sizes">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </SubSection>
            <SubSection label="States">
              <div className="flex flex-wrap items-center gap-3">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </SubSection>
            <SubSection label="With Icons">
              <div className="flex flex-wrap items-center gap-3">
                <Button iconLeft={<Mail className="h-4 w-4" />}>Send Email</Button>
                <Button variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>Continue</Button>
                <Button variant="secondary" iconLeft={<Download className="h-4 w-4" />}>Download</Button>
                <Button variant="destructive" iconLeft={<Trash2 className="h-4 w-4" />} size="sm">Delete</Button>
              </div>
            </SubSection>
          </Section>

          {/* Input */}
          <Section title="Input">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input label="Email" placeholder="you@example.com" type="email" iconLeft={<Mail className="h-4 w-4" />} />
              <Input label="Password" placeholder="••••••••" type="password" iconRight={<Lock className="h-4 w-4" />} />
              <Input label="Search" placeholder="Search…" iconLeft={<Search className="h-4 w-4" />} size="sm" helperText="Try searching for something" />
              <Input label="With Error" placeholder="Invalid input" error="This field is required" />
              <Input label="Disabled" placeholder="Can't edit this" disabled />
              <Input label="Large" placeholder="Large input" size="lg" />
            </div>
          </Section>

          {/* Select */}
          <Section title="Select">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="relative">
                <Select
                  label="Framework"
                  options={selectOptions}
                  value={selectValue}
                  onChange={setSelectValue}
                  placeholder="Choose a framework"
                  helperText="Angular is disabled"
                />
              </div>
              <div className="relative">
                <Select
                  label="With Error"
                  options={selectOptions}
                  error="Please select a framework"
                  placeholder="Select…"
                />
              </div>
            </div>
          </Section>

          {/* Tabs */}
          <Section title="Tabs">
            <Tabs defaultValue="overview">
              <Tabs.List>
                <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                <Tabs.Trigger value="features">Features</Tabs.Trigger>
                <Tabs.Trigger value="api">API</Tabs.Trigger>
                <Tabs.Trigger value="disabled" disabled>Disabled</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="overview">
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="text-sm text-card-foreground">
                    The Tabs component supports keyboard navigation (Arrow keys, Home, End),
                    controlled and uncontrolled patterns, and proper ARIA roles.
                  </p>
                </div>
              </Tabs.Content>
              <Tabs.Content value="features">
                <div className="rounded-lg border border-border bg-card p-6">
                  <ul className="space-y-1 text-sm text-card-foreground">
                    <li>• Compound component pattern</li>
                    <li>• Keyboard navigation</li>
                    <li>• Controlled & uncontrolled</li>
                    <li>• Disabled tabs support</li>
                  </ul>
                </div>
              </Tabs.Content>
              <Tabs.Content value="api">
                <div className="rounded-lg border border-border bg-card p-6">
                  <code className="text-xs text-muted-foreground font-mono">
                    {"<Tabs defaultValue=\"tab1\"><Tabs.List>…</Tabs.List><Tabs.Content value=\"tab1\">…</Tabs.Content></Tabs>"}
                  </code>
                </div>
              </Tabs.Content>
            </Tabs>
          </Section>

          {/* Toast */}
          <Section title="Toast / Notifications">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => toast({ title: "Default Toast", description: "This is a default notification." })}
              >
                Default
              </Button>
              <Button
                variant="primary"
                onClick={() => toast.success({ title: "Success!", description: "Your action was completed." })}
                iconLeft={<CheckCircle2 className="h-4 w-4" />}
              >
                Success
              </Button>
              <Button
                variant="destructive"
                onClick={() => toast.error({ title: "Error", description: "Something went wrong." })}
                iconLeft={<AlertCircle className="h-4 w-4" />}
              >
                Error
              </Button>
              <Button
                variant="secondary"
                onClick={() => toast.warning({ title: "Warning", description: "Please review your input." })}
              >
                Warning
              </Button>
              <Button
                variant="ghost"
                onClick={() => toast.info({ title: "Info", description: "Here's some useful information." })}
                iconLeft={<Info className="h-4 w-4" />}
              >
                Info
              </Button>
            </div>
          </Section>

          {/* Modal */}
          <Section title="Modal">
            <div className="flex flex-wrap gap-3">
              <Modal open={modalOpen} onOpenChange={setModalOpen}>
                <Modal.Trigger>
                  <Button variant="outline">Open Modal</Button>
                </Modal.Trigger>
                <Modal.Content>
                  <Modal.Header>Confirm Action</Modal.Header>
                  <Modal.Body>
                    <p className="text-muted-foreground">
                      Are you sure you want to proceed? This action supports focus trap, escape key,
                      click outside to close, and scroll lock.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button onClick={() => setModalOpen(false)}>Confirm</Button>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
              <Modal>
                <Modal.Trigger>
                  <Button variant="secondary">Uncontrolled Modal</Button>
                </Modal.Trigger>
                <Modal.Content>
                  <Modal.Header>Uncontrolled Pattern</Modal.Header>
                  <Modal.Body>
                    <p className="text-muted-foreground">
                      This modal manages its own open/close state internally.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="ghost">Close</Button>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </div>
          </Section>

          {/* Dropdown */}
          <Section title="Dropdown">
            <div className="flex flex-wrap gap-3">
              <Dropdown>
                <Dropdown.Trigger>
                  <Button variant="outline" iconRight={<ChevronDown className="h-4 w-4" />}>Actions</Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item onSelect={() => {}}><User className="mr-2 h-4 w-4" /> Profile</Dropdown.Item>
                  <Dropdown.Item onSelect={() => {}}><Settings className="mr-2 h-4 w-4" /> Settings</Dropdown.Item>
                  <Dropdown.Item onSelect={() => {}}><Copy className="mr-2 h-4 w-4" /> Copy Link</Dropdown.Item>
                  <Dropdown.Item disabled><Star className="mr-2 h-4 w-4" /> Premium (disabled)</Dropdown.Item>
                  <Dropdown.Item onSelect={() => {}}><LogOut className="mr-2 h-4 w-4" /> Log Out</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
              <Dropdown>
                <Dropdown.Trigger>
                  <Button variant="secondary" iconRight={<ChevronDown className="h-4 w-4" />}>Options</Button>
                </Dropdown.Trigger>
                <Dropdown.Content align="end">
                  <Dropdown.Item onSelect={() => {}}><Heart className="mr-2 h-4 w-4" /> Favorite</Dropdown.Item>
                  <Dropdown.Item onSelect={() => {}}><Download className="mr-2 h-4 w-4" /> Export</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </Section>

          {/* Tooltip */}
          <Section title="Tooltip">
            <div className="flex flex-wrap items-center gap-6">
              <Tooltip content="This is a top tooltip" position="top">
                <Button variant="outline" size="sm">Top</Button>
              </Tooltip>
              <Tooltip content="Bottom positioned" position="bottom">
                <Button variant="outline" size="sm">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left side" position="left">
                <Button variant="outline" size="sm">Left</Button>
              </Tooltip>
              <Tooltip content="Right side" position="right">
                <Button variant="outline" size="sm">Right</Button>
              </Tooltip>
              <Tooltip content="Keyboard accessible — try Tab + focus" position="top">
                <Button size="sm">Focus me</Button>
              </Tooltip>
            </div>
          </Section>

          {/* Spacing & Radius */}
          <Section title="Spacing & Radius">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Border Radius</h3>
                <div className="flex items-end gap-4">
                  <div className="h-12 w-12 rounded-sm bg-primary" />
                  <div className="h-12 w-12 rounded-md bg-primary" />
                  <div className="h-12 w-12 rounded-lg bg-primary" />
                  <div className="h-12 w-12 rounded-full bg-primary" />
                </div>
                <div className="flex gap-4 text-2xs text-muted-foreground">
                  <span className="w-12 text-center">sm</span>
                  <span className="w-12 text-center">md</span>
                  <span className="w-12 text-center">lg</span>
                  <span className="w-12 text-center">full</span>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Shadows</h3>
                <div className="flex items-end gap-4">
                  <div className="h-12 w-12 rounded-md bg-card border border-border shadow-sm" />
                  <div className="h-12 w-12 rounded-md bg-card border border-border shadow-md" />
                  <div className="h-12 w-12 rounded-md bg-card border border-border shadow-lg" />
                  <div className="h-12 w-12 rounded-md bg-card border border-border shadow-xl" />
                </div>
                <div className="flex gap-4 text-2xs text-muted-foreground">
                  <span className="w-12 text-center">sm</span>
                  <span className="w-12 text-center">md</span>
                  <span className="w-12 text-center">lg</span>
                  <span className="w-12 text-center">xl</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Accessibility */}
          <Section title="Accessibility">
            <div className="rounded-lg border border-border bg-card p-6 space-y-3">
              <ul className="space-y-2 text-sm text-card-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  All interactive elements support keyboard navigation
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Proper ARIA roles: dialog, menu, menuitem, tooltip, tab, tabpanel, combobox, listbox
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Focus trap in Modal, focus ring on all interactive elements
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  aria-busy on loading buttons, aria-describedby on tooltips, aria-invalid on form fields
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  WCAG-compliant contrast ratios across light and dark themes
                </li>
              </ul>
            </div>
          </Section>

          {/* Footer */}
          <footer className="border-t border-border pt-8 pb-12">
            <p className="text-sm text-muted-foreground">
              @ovie-ui/core - Built with React, TypeScript, Tailwind CSS, and Zustand.
            </p>
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
}
