# UI Components Documentation

This README provides an overview and usage examples for each UI component in the `src/components/ui` folder. Each component is built with React and leverages Radix UI, Lucide icons, and utility functions for styling. Below you'll find a summary and example usage for each component.

---

## Accordion
**Description:** Expandable/collapsible sections for content.
**Exports:** `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
**Example:**
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Alert
**Description:** Displays important messages.
**Exports:** `Alert`, `AlertTitle`, `AlertDescription`
**Example:**
```tsx
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong!</AlertDescription>
</Alert>
```

## AspectRatio
**Description:** Maintains a fixed aspect ratio for content.
**Exports:** `AspectRatio`
**Example:**
```tsx
<AspectRatio ratio={16 / 9}>
  <img src="..." alt="..." />
</AspectRatio>
```

## Avatar
**Description:** User profile image with fallback.
**Exports:** `Avatar`, `AvatarImage`, `AvatarFallback`
**Example:**
```tsx
<Avatar>
  <AvatarImage src="profile.jpg" />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```

## Badge
**Description:** Small status or label indicator.
**Exports:** `Badge`, `badgeVariants`
**Example:**
```tsx
<Badge variant="secondary">New</Badge>
```

## Breadcrumb
**Description:** Navigation hierarchy display.
**Exports:** `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, ...
**Example:**
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Button
**Description:** Customizable button component.
**Exports:** `Button`, `buttonVariants`
**Example:**
```tsx
<Button variant="primary" size="lg">Click Me</Button>
```

## Calendar
**Description:** Date picker component.
**Exports:** `Calendar`
**Example:**
```tsx
<Calendar selected={date} onSelect={setDate} />
```

## Card
**Description:** Container for grouped content.
**Exports:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
**Example:**
```tsx
<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>Details</CardContent>
</Card>
```

## Carousel
**Description:** Scrollable content slider.
**Exports:** `Carousel`, `useCarousel`, ...
**Example:**
```tsx
<Carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
</Carousel>
```

## Chart
**Description:** Data visualization using Recharts.
**Exports:** `ChartContainer`, `useChart`, ...
**Example:**
```tsx
<ChartContainer config={config}>
  {/* Recharts components here */}
</ChartContainer>
```

## Checkbox
**Description:** Custom checkbox input.
**Exports:** `Checkbox`
**Example:**
```tsx
<Checkbox checked={checked} onCheckedChange={setChecked} />
```

## Collapsible
**Description:** Expand/collapse content area.
**Exports:** `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`
**Example:**
```tsx
<Collapsible>
  <CollapsibleTrigger>Show/Hide</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>
```

## Command
**Description:** Command palette/dialog.
**Exports:** `Command`, `CommandDialog`, `CommandInput`, ...
**Example:**
```tsx
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command..." />
</CommandDialog>
```

## ContextMenu
**Description:** Right-click context menu.
**Exports:** `ContextMenu`, `ContextMenuTrigger`, ...
**Example:**
```tsx
<ContextMenu>
  <ContextMenuTrigger>Right click me</ContextMenuTrigger>
  <ContextMenuContent>Menu items</ContextMenuContent>
</ContextMenu>
```

## Dialog
**Description:** Modal dialog window.
**Exports:** `Dialog`, `DialogTrigger`, `DialogContent`, ...
**Example:**
```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>Dialog content</DialogContent>
</Dialog>
```

## Drawer
**Description:** Slide-in panel from edge.
**Exports:** `Drawer`, `DrawerTrigger`, `DrawerContent`, ...
**Example:**
```tsx
<Drawer>
  <DrawerTrigger>Open Drawer</DrawerTrigger>
  <DrawerContent>Drawer content</DrawerContent>
</Drawer>
```

## DropdownMenu
**Description:** Dropdown menu for actions.
**Exports:** `DropdownMenu`, `DropdownMenuTrigger`, ...
**Example:**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
  <DropdownMenuContent>Menu items</DropdownMenuContent>
</DropdownMenu>
```

## Form
**Description:** Form context and fields using react-hook-form.
**Exports:** `Form`, `FormField`, ...
**Example:**
```tsx
<Form {...methods}>
  <FormField name="email" render={({ field }) => <Input {...field} />} />
</Form>
```

## HoverCard
**Description:** Card shown on hover.
**Exports:** `HoverCard`, `HoverCardTrigger`, `HoverCardContent`
**Example:**
```tsx
<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>Extra info</HoverCardContent>
</HoverCard>
```

## InputOTP
**Description:** One-time password input.
**Exports:** `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`
**Example:**
```tsx
<InputOTP length={6} />
```

## Input
**Description:** Custom input field.
**Exports:** `Input`
**Example:**
```tsx
<Input type="text" placeholder="Enter text" />
```

## Label
**Description:** Form label.
**Exports:** `Label`
**Example:**
```tsx
<Label htmlFor="input">Label</Label>
```

## Menubar
**Description:** Menu bar navigation.
**Exports:** `Menubar`, `MenubarTrigger`, ...
**Example:**
```tsx
<Menubar>
  <MenubarTrigger>Menu</MenubarTrigger>
</Menubar>
```

## NavigationMenu
**Description:** Navigation menu bar.
**Exports:** `NavigationMenu`, `NavigationMenuTrigger`, ...
**Example:**
```tsx
<NavigationMenu>
  <NavigationMenuTrigger>Navigate</NavigationMenuTrigger>
</NavigationMenu>
```

## Pagination
**Description:** Pagination controls.
**Exports:** `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`
**Example:**
```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
  </PaginationContent>
</Pagination>
```

## Popover
**Description:** Popover content on trigger.
**Exports:** `Popover`, `PopoverTrigger`, `PopoverContent`
**Example:**
```tsx
<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Popover content</PopoverContent>
</Popover>
```

## Progress
**Description:** Progress bar indicator.
**Exports:** `Progress`
**Example:**
```tsx
<Progress value={50} />
```

## RadioGroup
**Description:** Group of radio buttons.
**Exports:** `RadioGroup`, `RadioGroupItem`
**Example:**
```tsx
<RadioGroup>
  <RadioGroupItem value="1" />
  <RadioGroupItem value="2" />
</RadioGroup>
```

## Resizable
**Description:** Resizable panels.
**Exports:** `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`
**Example:**
```tsx
<ResizablePanelGroup>
  <ResizablePanel>Panel 1</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Panel 2</ResizablePanel>
</ResizablePanelGroup>
```

## ScrollArea
**Description:** Custom scrollable area.
**Exports:** `ScrollArea`, `ScrollBar`
**Example:**
```tsx
<ScrollArea>
  <div>Content</div>
</ScrollArea>
```

## Select
**Description:** Custom select dropdown.
**Exports:** `Select`, `SelectTrigger`, ...
**Example:**
```tsx
<Select>
  <SelectTrigger>Select an option</SelectTrigger>
</Select>
```

## Separator
**Description:** Horizontal or vertical separator.
**Exports:** `Separator`
**Example:**
```tsx
<Separator />
```

## Sheet
**Description:** Slide-in sheet/modal.
**Exports:** `Sheet`, `SheetTrigger`, `SheetContent`, ...
**Example:**
```tsx
<Sheet>
  <SheetTrigger>Open Sheet</SheetTrigger>
  <SheetContent>Sheet content</SheetContent>
</Sheet>
```

## Sidebar
**Description:** Responsive sidebar navigation.
**Exports:** `SidebarProvider`, ...
**Example:**
```tsx
<SidebarProvider>
  {/* Sidebar content here */}
</SidebarProvider>
```

## Skeleton
**Description:** Loading placeholder.
**Exports:** `Skeleton`
**Example:**
```tsx
<Skeleton className="h-4 w-32" />
```

## Slider
**Description:** Range slider input.
**Exports:** `Slider`
**Example:**
```tsx
<Slider defaultValue={[50]} max={100} step={1} />
```

## Sonner
**Description:** Toast notification system.
**Exports:** `Toaster`, `toast`
**Example:**
```tsx
<Toaster />
toast("Hello!")
```

## Switch
**Description:** Toggle switch input.
**Exports:** `Switch`
**Example:**
```tsx
<Switch checked={on} onCheckedChange={setOn} />
```

## Table
**Description:** Table layout for data.
**Exports:** `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, ...
**Example:**
```tsx
<Table>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>
```

## Tabs
**Description:** Tabbed navigation.
**Exports:** `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
**Example:**
```tsx
<Tabs>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## Textarea
**Description:** Custom textarea input.
**Exports:** `Textarea`
**Example:**
```tsx
<Textarea placeholder="Type here..." />
```

## Toast
**Description:** Toast notification component.
**Exports:** `Toast`, `ToastProvider`, `ToastViewport`, ...
**Example:**
```tsx
<ToastProvider>
  <ToastViewport />
</ToastProvider>
```

## Toaster
**Description:** Toast notification manager.
**Exports:** `Toaster`
**Example:**
```tsx
<Toaster />
```

## ToggleGroup
**Description:** Group of toggle buttons.
**Exports:** `ToggleGroup`, `ToggleGroupItem`
**Example:**
```tsx
<ToggleGroup type="multiple">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
</ToggleGroup>
```

## Toggle
**Description:** Toggle button.
**Exports:** `Toggle`, `toggleVariants`
**Example:**
```tsx
<Toggle>Toggle me</Toggle>
```

## Tooltip
**Description:** Tooltip for elements.
**Exports:** `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`
**Example:**
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## use-toast
**Description:** Toast notification hook.
**Exports:** `useToast`, `toast`
**Example:**
```tsx
const { toast } = useToast();
toast("Message!");
```

---

For more details, refer to each component's source code and props. All components are designed to be composable and customizable for your UI needs.
