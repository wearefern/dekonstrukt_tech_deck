import React, { Suspense, lazy, useMemo, useState } from "react";
import {
  alpha,
  createTheme,
  ThemeProvider,
  styled,
} from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  Alert,
  CssBaseline,
  Skeleton,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import {
  AddRounded,
  AnalyticsRounded,
  AutoAwesomeRounded,
  BarChartRounded,
  CheckCircleRounded,
  CloseRounded,
  DashboardRounded,
  DarkModeRounded,
  EventRounded,
  FilterAltRounded,
  HomeRounded,
  InboxRounded,
  InsightsRounded,
  LightModeRounded,
  MenuRounded,
  NotificationsRounded,
  PeopleRounded,
  SearchRounded,
  SettingsRounded,
  TuneRounded,
  ViewKanbanRounded,
} from "@mui/icons-material";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Material 3 + Glassmorphism Dashboard Application
 * -------------------------------------------------
 * - React + TypeScript-ready structure (this file is JSX-compatible in React canvas)
 * - MUI v5+ Material Design 3 inspired theming
 * - Glass surfaces with blur, gradients, and layered shadows
 * - Accessible navigation, responsive layout, dialogs, chips, loaders, toasts
 * - Smooth motion with reduced-motion support
 *
 * Customization guide:
 * 1. Update `brand` colors below.
 * 2. Replace mock data in `metrics`, `projects`, and `activity`.
 * 3. Swap tabs/navigation labels for your product.
 * 4. Move sections into separate files in a real codebase.
 */

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const brand = {
  light: {
    primary: "#6750A4",
    secondary: "#625B71",
    tertiary: "#7D5260",
    background: "#F6F3FF",
    surface: "#FFFFFF",
    surfaceTint: "#6750A4",
  },
  dark: {
    primary: "#D0BCFF",
    secondary: "#CCC2DC",
    tertiary: "#EFB8C8",
    background: "#100E17",
    surface: "#17141F",
    surfaceTint: "#D0BCFF",
  },
};

const glassSurface = (theme, elevation = 1) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: 16,
  border: `1px solid ${alpha(
    theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
    theme.palette.mode === "dark" ? 0.08 : 0.18,
  )}`,
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${alpha("#ffffff", 0.1)}, ${alpha(
          theme.palette.background.paper,
          0.74,
        )})`
      : `linear-gradient(135deg, ${alpha("#ffffff", 0.82)}, ${alpha(
          theme.palette.background.paper,
          0.72,
        )})`,
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  boxShadow:
    elevation === 0
      ? "none"
      : theme.palette.mode === "dark"
        ? "0 8px 32px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.18)"
        : "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
});

const AppShell = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background:
    theme.palette.mode === "dark"
      ? `radial-gradient(circle at 10% 20%, ${alpha(
          theme.palette.primary.main,
          0.16,
        )}, transparent 30%),
         radial-gradient(circle at 90% 10%, ${alpha(
           theme.palette.tertiary.main,
           0.14,
         )}, transparent 28%),
         linear-gradient(180deg, #0f0c16 0%, #14111f 45%, #0f0d17 100%)`
      : `radial-gradient(circle at 12% 18%, ${alpha(
          theme.palette.primary.main,
          0.12,
        )}, transparent 28%),
         radial-gradient(circle at 88% 10%, ${alpha(
           theme.palette.tertiary.main,
           0.1,
         )}, transparent 24%),
         linear-gradient(180deg, #faf7ff 0%, #f3f6ff 48%, #f7f5ff 100%)`,
  color: theme.palette.text.primary,
}));

const GlassCard = styled(Card)(({ theme }) => ({
  ...glassSurface(theme, 2),
}));

const GlassPanel = styled(Paper)(({ theme }) => ({
  ...glassSurface(theme, 1),
  padding: theme.spacing(2),
}));

const LazyInsightsPanel = lazy(() =>
  Promise.resolve({
    default: function InsightsPanel() {
      return (
        <Stack spacing={2}>
          <Typography variant="titleMedium" fontWeight={700}>
            AI Insights
          </Typography>
          <Typography variant="bodyMedium" color="text.secondary">
            Engagement is up 18% this week. Event conversions are strongest on
            Friday evening, and premium upsell performs best after users
            complete two core actions.
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Retention +8%" color="primary" />
            <Chip label="Conversions +12%" color="secondary" />
            <Chip label="Latency stable" color="success" />
          </Stack>
        </Stack>
      );
    },
  }),
);

function buildTheme(mode) {
  const paletteSeed = mode === "dark" ? brand.dark : brand.light;
  return createTheme({
    palette: {
      mode,
      primary: { main: paletteSeed.primary },
      secondary: { main: paletteSeed.secondary },
      tertiary: { main: paletteSeed.tertiary },
      background: {
        default: paletteSeed.background,
        paper: paletteSeed.surface,
      },
      surfaceTint: { main: paletteSeed.surfaceTint },
      success: { main: "#2E7D32" },
      warning: { main: "#B26A00" },
      error: { main: "#BA1A1A" },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: 'Roboto, "Google Sans", "Helvetica Neue", Arial, sans-serif',
      displayLarge: {
        fontSize: "3.5625rem",
        fontWeight: 500,
        lineHeight: 1.12,
      },
      displayMedium: {
        fontSize: "2.8125rem",
        fontWeight: 500,
        lineHeight: 1.16,
      },
      displaySmall: { fontSize: "2.25rem", fontWeight: 500, lineHeight: 1.22 },
      headlineLarge: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.25 },
      headlineMedium: {
        fontSize: "1.75rem",
        fontWeight: 600,
        lineHeight: 1.28,
      },
      headlineSmall: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.32 },
      titleLarge: { fontSize: "1.375rem", fontWeight: 700, lineHeight: 1.28 },
      titleMedium: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.5 },
      titleSmall: { fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.43 },
      bodyLarge: { fontSize: "1rem", lineHeight: 1.6 },
      bodyMedium: { fontSize: "0.9375rem", lineHeight: 1.57 },
      bodySmall: { fontSize: "0.8125rem", lineHeight: 1.5 },
      labelLarge: { fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.43 },
      labelMedium: { fontSize: "0.75rem", fontWeight: 600, lineHeight: 1.33 },
      labelSmall: { fontSize: "0.6875rem", fontWeight: 600, lineHeight: 1.45 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root": {
            colorScheme: mode,
          },
          "*": {
            boxSizing: "border-box",
          },
          html: {
            scrollBehavior: "smooth",
          },
          body: {
            margin: 0,
          },
          "@media (prefers-reduced-motion: reduce)": {
            "*": {
              animationDuration: "0.01ms !important",
              animationIterationCount: "1 !important",
              transitionDuration: "0.01ms !important",
              scrollBehavior: "auto !important",
            },
          },
          ".shimmer": {
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite linear",
          },
          "@keyframes shimmer": {
            "0%": { backgroundPosition: "200% 0" },
            "100%": { backgroundPosition: "-200% 0" },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: "none",
            minHeight: 40,
            paddingInline: 18,
            fontWeight: 700,
            transition:
              "transform 220ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 220ms cubic-bezier(0.4, 0, 0.2, 1)",
            ":hover": {
              transform: "scale(1.02)",
            },
            ":focus-visible": {
              outline: `3px solid ${alpha(paletteSeed.primary, 0.35)}`,
              outlineOffset: 2,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
            overflow: "hidden",
          },
        },
      },
    },
  });
}

const navItems = [
  { label: "Overview", icon: <DashboardRounded /> },
  { label: "Analytics", icon: <BarChartRounded /> },
  { label: "Projects", icon: <ViewKanbanRounded /> },
  { label: "People", icon: <PeopleRounded /> },
  { label: "Settings", icon: <SettingsRounded /> },
];

const metrics = [
  {
    title: "Active Users",
    value: "28.4K",
    delta: "+12.6%",
    icon: <PeopleRounded fontSize="small" />,
  },
  {
    title: "Revenue",
    value: "$84.2K",
    delta: "+8.3%",
    icon: <AnalyticsRounded fontSize="small" />,
  },
  {
    title: "Conversion Rate",
    value: "6.8%",
    delta: "+1.2%",
    icon: <CheckCircleRounded fontSize="small" />,
  },
  {
    title: "Events",
    value: "143",
    delta: "+5 today",
    icon: <EventRounded fontSize="small" />,
  },
];

const projects = [
  {
    name: "Onboarding Experience",
    owner: "Maya Chen",
    progress: 72,
    status: "At risk",
    tag: "Product",
  },
  {
    name: "Revenue Expansion",
    owner: "Luca Morgan",
    progress: 91,
    status: "Healthy",
    tag: "Growth",
  },
  {
    name: "AI Recommendations",
    owner: "Nina Perera",
    progress: 58,
    status: "In review",
    tag: "AI",
  },
];

const activity = [
  "New enterprise workspace created",
  "Billing threshold alert resolved",
  "Campaign segment sync completed",
  "AI insight report generated",
];

function SectionHeader({ title, subtitle, action }) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={1}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent="space-between"
      sx={{ mb: 2 }}
    >
      <Box>
        <Typography variant="titleLarge">{title}</Typography>
        {subtitle && (
          <Typography
            variant="bodyMedium"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {action}
    </Stack>
  );
}

function MetricCard({ item, reduceMotion }) {
  return (
    <MotionCard
      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
      transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
      sx={(theme) => ({
        ...glassSurface(theme, 2),
        minHeight: 148,
      })}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack spacing={1}>
            <Typography variant="labelLarge" color="text.secondary">
              {item.title}
            </Typography>
            <Typography variant="headlineMedium">{item.value}</Typography>
            <Chip
              size="small"
              color="primary"
              variant="filled"
              label={item.delta}
              sx={{ alignSelf: "flex-start" }}
            />
          </Stack>
          <Box
            sx={(theme) => ({
              width: 44,
              height: 44,
              borderRadius: 3,
              display: "grid",
              placeItems: "center",
              background: alpha(theme.palette.primary.main, 0.12),
              color: "primary.main",
            })}
          >
            {item.icon}
          </Box>
        </Stack>
      </CardContent>
    </MotionCard>
  );
}

function ProjectCard({ project }) {
  const statusColor =
    project.status === "Healthy"
      ? "success"
      : project.status === "At risk"
        ? "warning"
        : "secondary";

  return (
    <GlassCard elevation={0}>
      <CardContent>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="titleMedium">{project.name}</Typography>
            <Chip size="small" label={project.tag} variant="outlined" />
          </Stack>
          <Typography variant="bodySmall" color="text.secondary">
            Owner: {project.owner}
          </Typography>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Typography variant="labelMedium">Progress</Typography>
              <Typography variant="labelMedium">{project.progress}%</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={project.progress}
              sx={{ height: 8, borderRadius: 999 }}
              aria-label={`${project.name} progress ${project.progress}%`}
            />
          </Box>
          <Chip
            size="small"
            color={statusColor}
            label={project.status}
            sx={{ alignSelf: "flex-start" }}
          />
        </Stack>
      </CardContent>
    </GlassCard>
  );
}

function QuickActionDialog({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Dashboard");
  const [priority, setPriority] = useState("Normal");

  const handleCreate = () => {
    if (!name.trim()) return;
    onSubmit(`${type} created: ${name}`);
    setName("");
    setType("Dashboard");
    setPriority("Normal");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="create-item-dialog-title"
    >
      <DialogTitle id="create-item-dialog-title">
        Create workspace item
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Quarterly performance report"
            autoFocus
          />

          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="item-type-label">Type</InputLabel>
                <Select
                  labelId="item-type-label"
                  value={type}
                  label="Type"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value="Dashboard">Dashboard</MenuItem>
                  <MenuItem value="Project">Project</MenuItem>
                  <MenuItem value="Campaign">Campaign</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  value={priority}
                  label="Priority"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Normal">Normal</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label={`Type: ${type}`} variant="outlined" />
            <Chip label={`Priority: ${priority}`} color="primary" />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={!name.trim()}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function LoadingOverview() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rounded" height={128} className="shimmer" />
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((i) => (
          <Grid key={i} xs={12} sm={6} xl={3}>
            <Skeleton variant="rounded" height={148} className="shimmer" />
          </Grid>
        ))}
      </Grid>
      <Skeleton variant="rounded" height={280} className="shimmer" />
    </Stack>
  );
}

function OverviewPanel({ reduceMotion, onOpenDialog }) {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = `${p.name} ${p.owner} ${p.tag}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "All" || p.tag === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <Stack spacing={3}>
      <GlassPanel>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Box>
            <Typography variant="headlineSmall">
              Material 3 Control Center
            </Typography>
            <Typography
              variant="bodyMedium"
              color="text.secondary"
              sx={{ mt: 1, maxWidth: 720 }}
            >
              Enterprise-ready dashboard with modern glass surfaces, responsive
              navigation, accessible interactions, and polished micro-motion.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              startIcon={<AddRounded />}
              onClick={onOpenDialog}
            >
              New item
            </Button>
            <Button variant="outlined" startIcon={<AutoAwesomeRounded />}>
              Generate summary
            </Button>
            <Button variant="text" startIcon={<TuneRounded />}>
              Customize
            </Button>
          </Stack>
        </Stack>
      </GlassPanel>

      <Grid container spacing={2}>
        {metrics.map((item) => (
          <Grid key={item.title} xs={12} sm={6} xl={3}>
            <MetricCard item={item} reduceMotion={reduceMotion} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={12} lg={8}>
          <GlassPanel>
            <SectionHeader
              title="Workflows"
              subtitle="Critical path: review activity, filter projects, and take action."
              action={
                <Stack direction="row" spacing={1}>
                  <Chip
                    icon={<FilterAltRounded />}
                    label="Filters"
                    variant="outlined"
                  />
                  <Chip label="Synced" color="success" />
                </Stack>
              }
            />

            <Tabs
              value={tab}
              onChange={(_, value) => setTab(value)}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="overview tabs"
            >
              <Tab label="Projects" />
              <Tab label="Activity" />
              <Tab label="Intelligence" />
            </Tabs>

            <Divider sx={{ my: 2 }} />

            <AnimatePresence mode="wait">
              <MotionBox
                key={tab}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              >
                {tab === 0 && (
                  <Stack spacing={2}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid xs={12} md={7}>
                        <FormControl fullWidth>
                          <OutlinedInput
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search projects, owners, or categories"
                            startAdornment={
                              <InputAdornment position="start">
                                <SearchRounded fontSize="small" />
                              </InputAdornment>
                            }
                            aria-label="Search projects"
                          />
                        </FormControl>
                      </Grid>
                      <Grid xs={12} md={5}>
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          {["All", "Product", "Growth", "AI"].map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              clickable
                              color={filter === value ? "primary" : "default"}
                              onClick={() => setFilter(value)}
                              variant={filter === value ? "filled" : "outlined"}
                            />
                          ))}
                        </Stack>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      {filteredProjects.length ? (
                        filteredProjects.map((project) => (
                          <Grid key={project.name} xs={12} md={6}>
                            <ProjectCard project={project} />
                          </Grid>
                        ))
                      ) : (
                        <Grid xs={12}>
                          <GlassCard elevation={0}>
                            <CardContent>
                              <Typography variant="titleMedium">
                                No matching results
                              </Typography>
                              <Typography
                                variant="bodyMedium"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                              >
                                Try adjusting your search or filters to surface
                                more projects.
                              </Typography>
                            </CardContent>
                          </GlassCard>
                        </Grid>
                      )}
                    </Grid>
                  </Stack>
                )}

                {tab === 1 && (
                  <Stack spacing={1.25}>
                    {activity.map((item) => (
                      <GlassCard key={item} elevation={0}>
                        <CardContent>
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                          >
                            <Avatar
                              sx={{
                                bgcolor: "primary.main",
                                width: 36,
                                height: 36,
                              }}
                            >
                              <InsightsRounded fontSize="small" />
                            </Avatar>
                            <Box>
                              <Typography variant="titleSmall">
                                {item}
                              </Typography>
                              <Typography
                                variant="bodySmall"
                                color="text.secondary"
                              >
                                Just now • automated workflow event
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </GlassCard>
                    ))}
                  </Stack>
                )}

                {tab === 2 && (
                  <Suspense
                    fallback={
                      <Skeleton
                        variant="rounded"
                        height={180}
                        className="shimmer"
                      />
                    }
                  >
                    <GlassCard elevation={0}>
                      <CardContent>
                        <LazyInsightsPanel />
                      </CardContent>
                    </GlassCard>
                  </Suspense>
                )}
              </MotionBox>
            </AnimatePresence>
          </GlassPanel>
        </Grid>

        <Grid xs={12} lg={4}>
          <Stack spacing={2}>
            <GlassPanel>
              <SectionHeader
                title="Progress"
                subtitle="Primary user flow: review, create, and monitor outcomes."
              />
              <Stack spacing={2}>
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="labelLarge">
                      Quarterly objective
                    </Typography>
                    <Typography variant="labelLarge">84%</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={84}
                    sx={{ height: 10, borderRadius: 999 }}
                  />
                </Box>
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="labelLarge">
                      Deployment readiness
                    </Typography>
                    <Typography variant="labelLarge">61%</Typography>
                  </Stack>
                  <LinearProgress
                    color="secondary"
                    variant="determinate"
                    value={61}
                    sx={{ height: 10, borderRadius: 999 }}
                  />
                </Box>
              </Stack>
            </GlassPanel>

            <GlassPanel>
              <SectionHeader title="Team pulse" />
              <Stack spacing={1.5}>
                {["Design sync", "Revenue review", "Launch prep"].map(
                  (name, i) => (
                    <Stack
                      key={name}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Avatar sx={{ width: 34, height: 34 }}>
                          {name.charAt(0)}
                        </Avatar>
                        <Typography variant="bodyMedium">{name}</Typography>
                      </Stack>
                      <Chip
                        label={
                          i === 0 ? "Live" : i === 1 ? "Today" : "Tomorrow"
                        }
                        size="small"
                        color={i === 0 ? "error" : "default"}
                      />
                    </Stack>
                  ),
                )}
              </Stack>
            </GlassPanel>

            <GlassPanel>
              <SectionHeader
                title="Loading state"
                subtitle="Polished skeleton and progress treatment."
              />
              <Stack spacing={1.5}>
                <LinearProgress sx={{ height: 8, borderRadius: 999 }} />
                <Stack direction="row" spacing={2} alignItems="center">
                  <CircularProgress size={28} />
                  <Typography variant="bodyMedium" color="text.secondary">
                    Syncing analytics snapshots...
                  </Typography>
                </Stack>
              </Stack>
            </GlassPanel>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default function Material3GlassDashboard() {
  const prefersReducedMotion = useReducedMotion();
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const isTabletUp = useMediaQuery("(min-width:768px)");

  const [mode, setMode] = useState(prefersDark ? "dark" : "light");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [navIndex, setNavIndex] = useState(0);
  const [initialLoading, setInitialLoading] = useState(false);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  const handleCreate = (message) => {
    setDialogOpen(false);
    setSnackbar({ open: true, message });
  };

  const navigationContent = (
    <Stack sx={{ height: "100%" }}>
      <Toolbar sx={{ minHeight: 72, px: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={(theme) => ({
              width: 40,
              height: 40,
              borderRadius: 3,
              display: "grid",
              placeItems: "center",
              bgcolor: alpha(theme.palette.primary.main, 0.18),
              color: "primary.main",
            })}
          >
            <AutoAwesomeRounded />
          </Box>
          <Box>
            <Typography variant="titleMedium">Glass Workspace</Typography>
            <Typography variant="bodySmall" color="text.secondary">
              Material 3 Console
            </Typography>
          </Box>
        </Stack>
      </Toolbar>

      <Box sx={{ px: 1.5, pb: 1 }}>
        <FormControl fullWidth size="small">
          <OutlinedInput
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <SearchRounded fontSize="small" />
              </InputAdornment>
            }
            aria-label="Global search"
          />
        </FormControl>
      </Box>

      <List sx={{ px: 1, py: 1 }} aria-label="Primary navigation">
        {navItems.map((item, index) => (
          <ListItemButton
            key={item.label}
            selected={navIndex === index}
            onClick={() => {
              setNavIndex(index);
              setDrawerOpen(false);
            }}
            sx={{
              minHeight: 48,
              borderRadius: 3,
              mb: 0.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <GlassPanel>
          <Typography variant="titleSmall">System health</Typography>
          <Typography
            variant="bodySmall"
            color="text.secondary"
            sx={{ mt: 0.75 }}
          >
            All services operational. Last incident resolved 2 days ago.
          </Typography>
          <Chip
            label="99.98% uptime"
            color="success"
            size="small"
            sx={{ mt: 1.5 }}
          />
        </GlassPanel>
      </Box>
    </Stack>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppShell>
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          {isDesktop ? (
            <Box
              component="aside"
              sx={(theme) => ({
                width: 300,
                borderRight: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                ...glassSurface(theme, 0),
                borderRadius: 0,
                background: alpha(theme.palette.background.paper, 0.42),
              })}
            >
              {navigationContent}
            </Box>
          ) : (
            <Drawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{ sx: { width: 300 } }}
            >
              {navigationContent}
            </Drawer>
          )}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <AppBar
              position="sticky"
              elevation={0}
              color="transparent"
              sx={(theme) => ({
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                backdropFilter: "blur(18px)",
                background: alpha(theme.palette.background.default, 0.62),
              })}
            >
              <Toolbar sx={{ minHeight: 72, gap: 1.5 }}>
                {!isDesktop && (
                  <IconButton
                    aria-label="Open navigation"
                    onClick={() => setDrawerOpen(true)}
                  >
                    <MenuRounded />
                  </IconButton>
                )}

                <Stack sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="titleLarge" noWrap>
                    {navItems[navIndex].label}
                  </Typography>
                  <Typography variant="bodySmall" color="text.secondary" noWrap>
                    Target: Web + Desktop • Audience: Professional / Enterprise
                    • Use case: Dashboard and operations control
                  </Typography>
                </Stack>

                {isTabletUp && (
                  <FormControl
                    sx={{ minWidth: 240, maxWidth: 360, flex: 1 }}
                    size="small"
                  >
                    <OutlinedInput
                      placeholder="Search workspace"
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchRounded fontSize="small" />
                        </InputAdornment>
                      }
                      aria-label="Search workspace"
                    />
                  </FormControl>
                )}

                <Tooltip
                  title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
                >
                  <IconButton
                    onClick={() =>
                      setMode((m) => (m === "dark" ? "light" : "dark"))
                    }
                    aria-label="Toggle theme"
                  >
                    {mode === "dark" ? (
                      <LightModeRounded />
                    ) : (
                      <DarkModeRounded />
                    )}
                  </IconButton>
                </Tooltip>

                <IconButton aria-label="Notifications">
                  <Badge badgeContent={3} color="error">
                    <NotificationsRounded />
                  </Badge>
                </IconButton>

                <Avatar alt="User profile">DK</Avatar>
              </Toolbar>
            </AppBar>

            <Container
              maxWidth={false}
              sx={{ px: { xs: 2, md: 3, xl: 4 }, py: 3 }}
            >
              <AnimatePresence mode="wait">
                <MotionBox
                  key={navIndex}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                >
                  {initialLoading ? (
                    <LoadingOverview />
                  ) : (
                    <OverviewPanel
                      reduceMotion={prefersReducedMotion}
                      onOpenDialog={() => setDialogOpen(true)}
                    />
                  )}
                </MotionBox>
              </AnimatePresence>
            </Container>

            {!isDesktop && (
              <Paper
                elevation={0}
                sx={(theme) => ({
                  position: "sticky",
                  bottom: 0,
                  zIndex: theme.zIndex.appBar,
                  borderTop: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                  backdropFilter: "blur(18px)",
                  background: alpha(theme.palette.background.paper, 0.72),
                })}
              >
                <BottomNavigation
                  showLabels
                  value={navIndex}
                  onChange={(_, value) => setNavIndex(value)}
                >
                  <BottomNavigationAction label="Home" icon={<HomeRounded />} />
                  <BottomNavigationAction
                    label="Inbox"
                    icon={<InboxRounded />}
                  />
                  <BottomNavigationAction
                    label="Insights"
                    icon={<InsightsRounded />}
                  />
                  <BottomNavigationAction
                    label="Settings"
                    icon={<SettingsRounded />}
                  />
                </BottomNavigation>
              </Paper>
            )}
          </Box>
        </Box>

        <Fab
          color="primary"
          aria-label="Create new item"
          onClick={() => setDialogOpen(true)}
          sx={{ position: "fixed", right: 24, bottom: isDesktop ? 24 : 88 }}
        >
          <AddRounded />
        </Fab>

        <QuickActionDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleCreate}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </AppShell>
    </ThemeProvider>
  );
}
