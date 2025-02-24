interface ChartColors {
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
}

interface ThemeColor {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
    radius?: string;
    chart?: ChartColors; // Optional property
}

interface Themes {
    [key: string]: {
        light: ThemeColor;
        dark: ThemeColor;
    };
}
export const themes: Themes = {
  
  Orange: {
  light: {
    background: "0 0% 100%",
    foreground: "20 14.3% 4.1%",
    card: "0 0% 100%",
    cardForeground: "20 14.3% 4.1%",
    popover: "0 0% 100%",
    popoverForeground: "20 14.3% 4.1%",
    primary: "24.6 95% 53.1%",
    primaryForeground: "60 9.1% 97.8%",
    secondary: "60 4.8% 95.9%",
    secondaryForeground: "24 9.8% 10%",
    muted: "60 4.8% 95.9%",
    mutedForeground: "25 5.3% 44.7%",
    accent: "60 4.8% 95.9%",
    accentForeground: "24 9.8% 10%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "60 9.1% 97.8%",
    border: "20 5.9% 90%",
    input: "20 5.9% 90%",
    ring: "24.6 95% 53.1%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "20 14.3% 4.1%",
    foreground: "60 9.1% 97.8%",
    card: "20 14.3% 4.1%",
    cardForeground: "60 9.1% 97.8%",
    popover: "20 14.3% 4.1%",
    popoverForeground: "60 9.1% 97.8%",
    primary: "20.5 90.2% 48.2%",
    primaryForeground: "60 9.1% 97.8%",
    secondary: "12 6.5% 15.1%",
    secondaryForeground: "60 9.1% 97.8%",
    muted: "12 6.5% 15.1%",
    mutedForeground: "24 5.4% 63.9%",
    accent: "12 6.5% 15.1%",
    accentForeground: "60 9.1% 97.8%",
    destructive: "0 72.2% 50.6%",
    destructiveForeground: "60 9.1% 97.8%",
    border: "12 6.5% 15.1%",
    input: "12 6.5% 15.1%",
    ring: "20.5 90.2% 48.2%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
},
  Slate: {
  light: {
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    card: "0 0% 100%",
    cardForeground: "222.2 84% 4.9%",
    popover: "0 0% 100%",
    popoverForeground: "222.2 84% 4.9%",
    primary: "222.2 47.4% 11.2%",
    primaryForeground: "210 40% 98%",
    secondary: "210 40% 96.1%",
    secondaryForeground: "222.2 47.4% 11.2%",
    muted: "210 40% 96.1%",
    mutedForeground: "215.4 16.3% 46.9%",
    accent: "210 40% 96.1%",
    accentForeground: "222.2 47.4% 11.2%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "210 40% 98%",
    border: "214.3 31.8% 91.4%",
    input: "214.3 31.8% 91.4%",
    ring: "222.2 84% 4.9%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "222.2 84% 4.9%",
    foreground: "210 40% 98%",
    card: "222.2 84% 4.9%",
    cardForeground: "210 40% 98%",
    popover: "222.2 84% 4.9%",
    popoverForeground: "210 40% 98%",
    primary: "210 40% 98%",
    primaryForeground: "222.2 47.4% 11.2%",
    secondary: "217.2 32.6% 17.5%",
    secondaryForeground: "210 40% 98%",
    muted: "217.2 32.6% 17.5%",
    mutedForeground: "215 20.2% 65.1%",
    accent: "217.2 32.6% 17.5%",
    accentForeground: "210 40% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "210 40% 98%",
    border: "217.2 32.6% 17.5%",
    input: "217.2 32.6% 17.5%",
    ring: "212.7 26.8% 83.9%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
},
  Gray: {
  light: {
    background: "0 0% 100%",
    foreground: "224 71.4% 4.1%",
    card: "0 0% 100%",
    cardForeground: "224 71.4% 4.1%",
    popover: "0 0% 100%",
    popoverForeground: "224 71.4% 4.1%",
    primary: "220.9 39.3% 11%",
    primaryForeground: "210 20% 98%",
    secondary: "220 14.3% 95.9%",
    secondaryForeground: "220.9 39.3% 11%",
    muted: "220 14.3% 95.9%",
    mutedForeground: "220 8.9% 46.1%",
    accent: "220 14.3% 95.9%",
    accentForeground: "220.9 39.3% 11%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "210 20% 98%",
    border: "220 13% 91%",
    input: "220 13% 91%",
    ring: "224 71.4% 4.1%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "224 71.4% 4.1%",
    foreground: "210 20% 98%",
    card: "224 71.4% 4.1%",
    cardForeground: "210 20% 98%",
    popover: "224 71.4% 4.1%",
    popoverForeground: "210 20% 98%",
    primary: "210 20% 98%",
    primaryForeground: "220.9 39.3% 11%",
    secondary: "215 27.9% 16.9%",
    secondaryForeground: "210 20% 98%",
    muted: "215 27.9% 16.9%",
    mutedForeground: "217.9 10.6% 64.9%",
    accent: "215 27.9% 16.9%",
    accentForeground: "210 20% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "210 20% 98%",
    border: "215 27.9% 16.9%",
    input: "215 27.9% 16.9%",
    ring: "216 12.2% 83.9%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
},
  Zinc: {
  light: {
    background: "0 0% 100%",
    foreground: "240 10% 3.9%",
    card: "0 0% 100%",
    cardForeground: "240 10% 3.9%",
    popover: "0 0% 100%",
    popoverForeground: "240 10% 3.9%",
    primary: "240 5.9% 10%",
    primaryForeground: "0 0% 98%",
    secondary: "240 4.8% 95.9%",
    secondaryForeground: "240 5.9% 10%",
    muted: "240 4.8% 95.9%",
    mutedForeground: "240 3.8% 46.1%",
    accent: "240 4.8% 95.9%",
    accentForeground: "240 5.9% 10%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "0 0% 98%",
    border: "240 5.9% 90%",
    input: "240 5.9% 90%",
    ring: "240 5.9% 10%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "240 10% 3.9%",
    foreground: "0 0% 98%",
    card: "240 10% 3.9%",
    cardForeground: "0 0% 98%",
    popover: "240 10% 3.9%",
    popoverForeground: "0 0% 98%",
    primary: "0 0% 98%",
    primaryForeground: "240 5.9% 10%",
    secondary: "240 3.7% 15.9%",
    secondaryForeground: "0 0% 98%",
    muted: "240 3.7% 15.9%",
    mutedForeground: "240 5% 64.9%",
    accent: "240 3.7% 15.9%",
    accentForeground: "0 0% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "0 0% 98%",
    border: "240 3.7% 15.9%",
    input: "240 3.7% 15.9%",
    ring: "240 4.9% 83.9%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
},

  Neutral: {
  light: {
    background: "0 0% 100%",
    foreground: "0 0% 3.9%",
    card: "0 0% 100%",
    cardForeground: "0 0% 3.9%",
    popover: "0 0% 100%",
    popoverForeground: "0 0% 3.9%",
    primary: "0 0% 9%",
    primaryForeground: "0 0% 98%",
    secondary: "0 0% 96.1%",
    secondaryForeground: "0 0% 9%",
    muted: "0 0% 96.1%",
    mutedForeground: "0 0% 45.1%",
    accent: "0 0% 96.1%",
    accentForeground: "0 0% 9%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "0 0% 98%",
    border: "0 0% 89.8%",
    input: "0 0% 89.8%",
    ring: "0 0% 3.9%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "0 0% 3.9%",
    foreground: "0 0% 98%",
    card: "0 0% 3.9%",
    cardForeground: "0 0% 98%",
    popover: "0 0% 3.9%",
    popoverForeground: "0 0% 98%",
    primary: "0 0% 98%",
    primaryForeground: "0 0% 9%",
    secondary: "0 0% 14.9%",
    secondaryForeground: "0 0% 98%",
    muted: "0 0% 14.9%",
    mutedForeground: "0 0% 63.9%",
    accent: "0 0% 14.9%",
    accentForeground: "0 0% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "0 0% 98%",
    border: "0 0% 14.9%",
    input: "0 0% 14.9%",
    ring: "0 0% 83.1%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
},
  Stone: {
  light: {
    background: "0 0% 100%",
    foreground: "20 14.3% 4.1%",
    card: "0 0% 100%",
    cardForeground: "20 14.3% 4.1%",
    popover: "0 0% 100%",
    popoverForeground: "20 14.3% 4.1%",
    primary: "24 9.8% 10%",
    primaryForeground: "60 9.1% 97.8%",
    secondary: "60 4.8% 95.9%",
    secondaryForeground: "24 9.8% 10%",
    muted: "60 4.8% 95.9%",
    mutedForeground: "25 5.3% 44.7%",
    accent: "60 4.8% 95.9%",
    accentForeground: "24 9.8% 10%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "60 9.1% 97.8%",
    border: "20 5.9% 90%",
    input: "20 5.9% 90%",
    ring: "20 14.3% 4.1%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "20 14.3% 4.1%",
    foreground: "60 9.1% 97.8%",
    card: "20 14.3% 4.1%",
    cardForeground: "60 9.1% 97.8%",
    popover: "20 14.3% 4.1%",
    popoverForeground: "60 9.1% 97.8%",
    primary: "60 9.1% 97.8%",
    primaryForeground: "24 9.8% 10%",
    secondary: "12 6.5% 15.1%",
    secondaryForeground: "60 9.1% 97.8%",
    muted: "12 6.5% 15.1%",
    mutedForeground: "24 5.4% 63.9%",
    accent: "12 6.5% 15.1%",
    accentForeground: "60 9.1% 97.8%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "60 9.1% 97.8%",
    border: "12 6.5% 15.1%",
    input: "12 6.5% 15.1%",
    ring: "24 5.7% 82.9%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
},
  Red: {
  light: {
    background: "0 0% 100%",
    foreground: "0 0% 3.9%",
    card: "0 0% 100%",
    cardForeground: "0 0% 3.9%",
    popover: "0 0% 100%",
    popoverForeground: "0 0% 3.9%",
    primary: "0 72.2% 50.6%",
    primaryForeground: "0 85.7% 97.3%",
    secondary: "0 0% 96.1%",
    secondaryForeground: "0 0% 9%",
    muted: "0 0% 96.1%",
    mutedForeground: "0 0% 45.1%",
    accent: "0 0% 96.1%",
    accentForeground: "0 0% 9%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "0 0% 98%",
    border: "0 0% 89.8%",
    input: "0 0% 89.8%",
    ring: "0 72.2% 50.6%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "0 0% 3.9%",
    foreground: "0 0% 98%",
    card: "0 0% 3.9%",
    cardForeground: "0 0% 98%",
    popover: "0 0% 3.9%",
    popoverForeground: "0 0% 98%",
    primary: "0 72.2% 50.6%",
    primaryForeground: "0 85.7% 97.3%",
    secondary: "0 0% 14.9%",
    secondaryForeground: "0 0% 98%",
    muted: "0 0% 14.9%",
    mutedForeground: "0 0% 63.9%",
    accent: "0 0% 14.9%",
    accentForeground: "0 0% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "0 0% 98%",
    border: "0 0% 14.9%",
    input: "0 0% 14.9%",
    ring: "0 72.2% 50.6%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
},
  Amber: {
     light: {
    background: '0 0% 100%',
    foreground: '25 80% 4.1%',
    card: '0 0% 100%',
    cardForeground: '25 80% 4.1%',
    popover: '0 0% 100%',
    popoverForeground: '25 80% 4.1%',
    primary: '40 100% 50%',
    primaryForeground: '210 10% 98%',
    secondary: '25 10% 95.9%',
    secondaryForeground: '25 40% 11%',
    muted: '25 10% 95.9%',
    mutedForeground: '25 5% 46.1%',
    accent: '25 10% 95.9%',
    accentForeground: '25 40% 11%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 10% 98%',
    border: '25 5% 90%',
    input: '25 5% 90%',
    ring: '40 100% 50%',
    radius: '1rem',
    chart: {
      chart1: '12 76% 61%',
      chart2: '173 58% 39%',
      chart3: '197 37% 24%',
      chart4: '43 74% 66%',
      chart5: '27 87% 67%',
    },
  },
  dark: {
    background: '25 80% 4.1%',
    foreground: '210 10% 98%',
    card: '25 80% 4.1%',
    cardForeground: '210 10% 98%',
    popover: '25 80% 4.1%',
    popoverForeground: '210 10% 98%',
    primary: '40 100% 50%',
    primaryForeground: '210 10% 98%',
    secondary: '25 5% 15.9%',
    secondaryForeground: '210 10% 98%',
    muted: '25 5% 15.9%',
    mutedForeground: '25 10% 64.9%',
    accent: '25 5% 15.9%',
    accentForeground: '210 10% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 10% 98%',
    border: '25 5% 15.9%',
    input: '25 5% 15.9%',
    ring: '40 100% 50%',
    chart: {
      chart1: '220 70% 50%',
      chart2: '160 60% 45%',
      chart3: '30 80% 55%',
      chart4: '280 65% 60%',
      chart5: '340 75% 55%',
    },
  },
  },
  Yellow: {
  light: {
    background: "0 0% 100%",
    foreground: "20 14.3% 4.1%",
    card: "0 0% 100%",
    cardForeground: "20 14.3% 4.1%",
    popover: "0 0% 100%",
    popoverForeground: "20 14.3% 4.1%",
    primary: "47.9 95.8% 53.1%",
    primaryForeground: "26 83.3% 14.1%",
    secondary: "60 4.8% 95.9%",
    secondaryForeground: "24 9.8% 10%",
    muted: "60 4.8% 95.9%",
    mutedForeground: "25 5.3% 44.7%",
    accent: "60 4.8% 95.9%",
    accentForeground: "24 9.8% 10%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "60 9.1% 97.8%",
    border: "20 5.9% 90%",
    input: "20 5.9% 90%",
    ring: "20 14.3% 4.1%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "20 14.3% 4.1%",
    foreground: "60 9.1% 97.8%",
    card: "20 14.3% 4.1%",
    cardForeground: "60 9.1% 97.8%",
    popover: "20 14.3% 4.1%",
    popoverForeground: "60 9.1% 97.8%",
    primary: "47.9 95.8% 53.1%",
    primaryForeground: "26 83.3% 14.1%",
    secondary: "12 6.5% 15.1%",
    secondaryForeground: "60 9.1% 97.8%",
    muted: "12 6.5% 15.1%",
    mutedForeground: "24 5.4% 63.9%",
    accent: "12 6.5% 15.1%",
    accentForeground: "60 9.1% 97.8%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "60 9.1% 97.8%",
    border: "12 6.5% 15.1%",
    input: "12 6.5% 15.1%",
    ring: "35.5 91.7% 32.9%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
},
  Lime: {
    light: {
    background: '0 0% 100%',
    foreground: '80 60% 4.1%',
    card: '0 0% 100%',
    cardForeground: '80 60% 4.1%',
    popover: '0 0% 100%',
    popoverForeground: '80 60% 4.1%',
    primary: '70 100% 50%',
    primaryForeground: '210 10% 98%',
    secondary: '80 10% 95.9%',
    secondaryForeground: '80 40% 11%',
    muted: '80 10% 95.9%',
    mutedForeground: '80 5% 46.1%',
    accent: '80 10% 95.9%',
    accentForeground: '80 40% 11%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 10% 98%',
    border: '80 5% 90%',
    input: '80 5% 90%',
    ring: '70 100% 50%',
    radius: '1rem',
    chart: {
      chart1: '12 76% 61%',
      chart2: '173 58% 39%',
      chart3: '197 37% 24%',
      chart4: '43 74% 66%',
      chart5: '27 87% 67%',
    },
  },
  dark: {
    background: '80 60% 4.1%',
    foreground: '210 10% 98%',
    card: '80 60% 4.1%',
    cardForeground: '210 10% 98%',
    popover: '80 60% 4.1%',
    popoverForeground: '210 10% 98%',
    primary: '70 100% 50%',
    primaryForeground: '210 10% 98%',
    secondary: '80 5% 15.9%',
    secondaryForeground: '210 10% 98%',
    muted: '80 5% 15.9%',
    mutedForeground: '80 10% 64.9%',
    accent: '80 5% 15.9%',
    accentForeground: '210 10% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 10% 98%',
    border: '80 5% 15.9%',
    input: '80 5% 15.9%',
    ring: '70 100% 50%',
    chart: {
      chart1: '220 70% 50%',
      chart2: '160 60% 45%',
      chart3: '30 80% 55%',
      chart4: '280 65% 60%',
      chart5: '340 75% 55%',
    },
  },
  },
  Green: {
  light: {
    background: "0 0% 100%",
    foreground: "240 10% 3.9%",
    card: "0 0% 100%",
    cardForeground: "240 10% 3.9%",
    popover: "0 0% 100%",
    popoverForeground: "240 10% 3.9%",
    primary: "142.1 76.2% 36.3%",
    primaryForeground: "355.7 100% 97.3%",
    secondary: "240 4.8% 95.9%",
    secondaryForeground: "240 5.9% 10%",
    muted: "240 4.8% 95.9%",
    mutedForeground: "240 3.8% 46.1%",
    accent: "240 4.8% 95.9%",
    accentForeground: "240 5.9% 10%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "0 0% 98%",
    border: "240 5.9% 90%",
    input: "240 5.9% 90%",
    ring: "142.1 76.2% 36.3%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "20 14.3% 4.1%",
    foreground: "0 0% 95%",
    card: "24 9.8% 10%",
    cardForeground: "0 0% 95%",
    popover: "0 0% 9%",
    popoverForeground: "0 0% 95%",
    primary: "142.1 70.6% 45.3%",
    primaryForeground: "144.9 80.4% 10%",
    secondary: "240 3.7% 15.9%",
    secondaryForeground: "0 0% 98%",
    muted: "0 0% 15%",
    mutedForeground: "240 5% 64.9%",
    accent: "12 6.5% 15.1%",
    accentForeground: "0 0% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "0 85.7% 97.3%",
    border: "240 3.7% 15.9%",
    input: "240 3.7% 15.9%",
    ring: "142.4 71.8% 29.2%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
},
  Emerald: {
     light: {
    background: '0 0% 100%',
    foreground: '180 10% 4.1%',
    card: '0 0% 100%',
    cardForeground: '180 10% 4.1%',
    popover: '0 0% 100%',
    popoverForeground: '180 10% 4.1%',
    primary: '150 60% 40%',
    primaryForeground: '210 10% 98%',
    secondary: '180 10% 95.9%',
    secondaryForeground: '180 40% 11%',
    muted: '180 10% 95.9%',
    mutedForeground: '180 5% 46.1%',
    accent: '180 10% 95.9%',
    accentForeground: '180 40% 11%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 10% 98%',
    border: '180 5% 90%',
    input: '180 5% 90%',
    ring: '150 60% 40%',
    radius: '1rem',
    chart: {
      chart1: '12 76% 61%',
      chart2: '173 58% 39%',
      chart3: '197 37% 24%',
      chart4: '43 74% 66%',
      chart5: '27 87% 67%',
    },
  },
  dark: {
    background: '180 10% 4.1%',
    foreground: '210 10% 98%',
    card: '180 10% 4.1%',
    cardForeground: '210 10% 98%',
    popover: '180 10% 4.1%',
    popoverForeground: '210 10% 98%',
    primary: '150 70% 50%',
    primaryForeground: '210 10% 98%',
    secondary: '180 5% 15.9%',
    secondaryForeground: '210 10% 98%',
    muted: '180 5% 15.9%',
    mutedForeground: '180 10% 64.9%',
    accent: '180 5% 15.9%',
    accentForeground: '210 10% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 10% 98%',
    border: '180 5% 15.9%',
    input: '180 5% 15.9%',
    ring: '150 70% 50%',
    chart: {
      chart1: '220 70% 50%',
      chart2: '160 60% 45%',
      chart3: '30 80% 55%',
      chart4: '280 65% 60%',
      chart5: '340 75% 55%',
    },
  },
  },
  Teal: {
    light: {
    background: '0 0% 100%',
    foreground: '180 10% 4.1%',
    card: '0 0% 100%',
    cardForeground: '180 10% 4.1%',
    popover: '0 0% 100%',
    popoverForeground: '180 10% 4.1%',
    primary: '180 60% 40%',
    primaryForeground: '210 10% 98%',
    secondary: '180 5% 95.9%',
    secondaryForeground: '180 40% 11%',
    muted: '180 5% 95.9%',
    mutedForeground: '180 5% 46.1%',
    accent: '180 5% 95.9%',
    accentForeground: '180 40% 11%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 10% 98%',
    border: '180 5% 90%',
    input: '180 5% 90%',
    ring: '180 60% 40%',
    radius: '1rem',
    chart: {
      chart1: '12 76% 61%',
      chart2: '173 58% 39%',
      chart3: '197 37% 24%',
      chart4: '43 74% 66%',
      chart5: '27 87% 67%',
    },
  },
  dark: {
    background: '180 10% 4.1%',
    foreground: '210 10% 98%',
    card: '180 10% 4.1%',
    cardForeground: '210 10% 98%',
    popover: '180 10% 4.1%',
    popoverForeground: '210 10% 98%',
    primary: '180 70% 50%',
    primaryForeground: '210 10% 98%',
    secondary: '180 5% 15.9%',
    secondaryForeground: '210 10% 98%',
    muted: '180 5% 15.9%',
    mutedForeground: '180 10% 64.9%',
    accent: '180 5% 15.9%',
    accentForeground: '210 10% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 10% 98%',
    border: '180 5% 15.9%',
    input: '180 5% 15.9%',
    ring: '180 70% 50%',
    chart: {
      chart1: '220 70% 50%',
      chart2: '160 60% 45%',
      chart3: '30 80% 55%',
      chart4: '280 65% 60%',
      chart5: '340 75% 55%',
    },
  },
  },
  Cyan: {
    light: {
    background: '0 0% 100%',
    foreground: '180 10% 4.1%',
    card: '0 0% 100%',
    cardForeground: '180 10% 4.1%',
    popover: '0 0% 100%',
    popoverForeground: '180 10% 4.1%',
    primary: '180 60% 40%',
    primaryForeground: '210 10% 98%',
    secondary: '180 5% 95.9%',
    secondaryForeground: '180 40% 11%',
    muted: '180 5% 95.9%',
    mutedForeground: '180 5% 46.1%',
    accent: '180 5% 95.9%',
    accentForeground: '180 40% 11%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 10% 98%',
    border: '180 5% 90%',
    input: '180 5% 90%',
    ring: '180 60% 40%',
    radius: '1rem',
    chart: {
      chart1: '12 76% 61%',
      chart2: '173 58% 39%',
      chart3: '197 37% 24%',
      chart4: '43 74% 66%',
      chart5: '27 87% 67%',
    },
  },
  dark: {
    background: '180 10% 4.1%',
    foreground: '210 10% 98%',
    card: '180 10% 4.1%',
    cardForeground: '210 10% 98%',
    popover: '180 10% 4.1%',
    popoverForeground: '210 10% 98%',
    primary: '180 70% 50%',
    primaryForeground: '210 10% 98%',
    secondary: '180 5% 15.9%',
    secondaryForeground: '210 10% 98%',
    muted: '180 5% 15.9%',
    mutedForeground: '180 10% 64.9%',
    accent: '180 5% 15.9%',
    accentForeground: '210 10% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 10% 98%',
    border: '180 5% 15.9%',
    input: '180 5% 15.9%',
    ring: '180 70% 50%',
    chart: {
      chart1: '220 70% 50%',
      chart2: '160 60% 45%',
      chart3: '30 80% 55%',
      chart4: '280 65% 60%',
      chart5: '340 75% 55%',
    },
  },
  },
  Sky: {
    light: {
    background: '0 0% 100%',
    foreground: '210 10% 4.1%',
    card: '0 0% 100%',
    cardForeground: '210 10% 4.1%',
    popover: '0 0% 100%',
    popoverForeground: '210 10% 4.1%',
    primary: '197 90% 55%',
    primaryForeground: '210 10% 98%',
    secondary: '210 40% 96.1%',
    secondaryForeground: '210 40% 11.2%',
    muted: '210 40% 96.1%',
    mutedForeground: '215.4 16.3% 46.9%',
    accent: '210 40% 96.1%',
    accentForeground: '210 40% 11.2%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 10% 98%',
    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    ring: '197 90% 55%',
    radius: '1rem',
    chart: {
      chart1: '12 76% 61%',
      chart2: '173 58% 39%',
      chart3: '197 37% 24%',
      chart4: '43 74% 66%',
      chart5: '27 87% 67%',
    },
  },
  dark: {
    background: '210 10% 4.1%',
    foreground: '210 10% 98%',
    card: '210 10% 4.1%',
    cardForeground: '210 10% 98%',
    popover: '210 10% 4.1%',
    popoverForeground: '210 10% 98%',
    primary: '197 90% 70%',
    primaryForeground: '210 40% 98%',
    secondary: '210 40% 17.5%',
    secondaryForeground: '210 10% 98%',
    muted: '210 40% 17.5%',
    mutedForeground: '215 20.2% 65.1%',
    accent: '210 40% 17.5%',
    accentForeground: '210 10% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 10% 98%',
    border: '210 40% 17.5%',
    input: '210 40% 17.5%',
    ring: '197 90% 70%',
    chart: {
      chart1: '220 70% 50%',
      chart2: '160 60% 45%',
      chart3: '30 80% 55%',
      chart4: '280 65% 60%',
      chart5: '340 75% 55%',
    },
  },
  },
  Blue: {
  light: {
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    card: "0 0% 100%",
    cardForeground: "222.2 84% 4.9%",
    popover: "0 0% 100%",
    popoverForeground: "222.2 84% 4.9%",
    primary: "221.2 83.2% 53.3%",
    primaryForeground: "210 40% 98%",
    secondary: "210 40% 96.1%",
    secondaryForeground: "222.2 47.4% 11.2%",
    muted: "210 40% 96.1%",
    mutedForeground: "215.4 16.3% 46.9%",
    accent: "210 40% 96.1%",
    accentForeground: "222.2 47.4% 11.2%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "210 40% 98%",
    border: "214.3 31.8% 91.4%",
    input: "214.3 31.8% 91.4%",
    ring: "221.2 83.2% 53.3%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "222.2 84% 4.9%",
    foreground: "210 40% 98%",
    card: "222.2 84% 4.9%",
    cardForeground: "210 40% 98%",
    popover: "222.2 84% 4.9%",
    popoverForeground: "210 40% 98%",
    primary: "217.2 91.2% 59.8%",
    primaryForeground: "222.2 47.4% 11.2%",
    secondary: "217.2 32.6% 17.5%",
    secondaryForeground: "210 40% 98%",
    muted: "217.2 32.6% 17.5%",
    mutedForeground: "215 20.2% 65.1%",
    accent: "217.2 32.6% 17.5%",
    accentForeground: "210 40% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "210 40% 98%",
    border: "217.2 32.6% 17.5%",
    input: "217.2 32.6% 17.5%",
    ring: "224.3 76.3% 48%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
},
  Indigo: {
     light: {
    background: '0 0% 100%',
    foreground: '240 10% 4.1%',
    card: '0 0% 100%',
    cardForeground: '240 10% 4.1%',
    popover: '0 0% 100%',
    popoverForeground: '240 10% 4.1%',
    primary: '210 80% 50%',
    primaryForeground: '210 40% 98%',
    secondary: '210 40% 96.1%',
    secondaryForeground: '240 47.4% 11.2%',
    muted: '210 40% 96.1%',
    mutedForeground: '215.4 16.3% 46.9%',
    accent: '210 40% 96.1%',
    accentForeground: '240 47.4% 11.2%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 40% 98%',
    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    ring: '210 80% 50%',
    radius: '1rem',
    chart: {
      chart1: '12 76% 61%',
      chart2: '173 58% 39%',
      chart3: '197 37% 24%',
      chart4: '43 74% 66%',
      chart5: '27 87% 67%',
    },
  },
  dark: {
    background: '240 10% 4.1%',
    foreground: '210 40% 98%',
    card: '240 10% 4.1%',
    cardForeground: '210 40% 98%',
    popover: '240 10% 4.1%',
    popoverForeground: '210 40% 98%',
    primary: '210 90% 70%',
    primaryForeground: '240 47.4% 11.2%',
    secondary: '210 40% 17.5%',
    secondaryForeground: '210 40% 98%',
    muted: '210 40% 17.5%',
    mutedForeground: '215 20.2% 65.1%',
    accent: '210 40% 17.5%',
    accentForeground: '210 40% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 40% 98%',
    border: '210 40% 17.5%',
    input: '210 40% 17.5%',
    ring: '210 90% 70%',
    chart: {
      chart1: '220 70% 50%',
      chart2: '160 60% 45%',
      chart3: '30 80% 55%',
      chart4: '280 65% 60%',
      chart5: '340 75% 55%',
    },
  },
  },
  Violet: {
    light: {
    background: "0 0% 100%",
    foreground: "224 71.4% 4.1%",
    card: "0 0% 100%",
    cardForeground: "224 71.4% 4.1%",
    popover: "0 0% 100%",
    popoverForeground: "224 71.4% 4.1%",
    primary: "262.1 83.3% 57.8%",
    primaryForeground: "210 20% 98%",
    secondary: "220 14.3% 95.9%",
    secondaryForeground: "220.9 39.3% 11%",
    muted: "220 14.3% 95.9%",
    mutedForeground: "220 8.9% 46.1%",
    accent: "220 14.3% 95.9%",
    accentForeground: "220.9 39.3% 11%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "210 20% 98%",
    border: "220 13% 91%",
    input: "220 13% 91%",
    ring: "262.1 83.3% 57.8%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "224 71.4% 4.1%",
    foreground: "210 20% 98%",
    card: "224 71.4% 4.1%",
    cardForeground: "210 20% 98%",
    popover: "224 71.4% 4.1%",
    popoverForeground: "210 20% 98%",
    primary: "263.4 70% 50.4%",
    primaryForeground: "210 20% 98%",
    secondary: "215 27.9% 16.9%",
    secondaryForeground: "210 20% 98%",
    muted: "215 27.9% 16.9%",
    mutedForeground: "217.9 10.6% 64.9%",
    accent: "215 27.9% 16.9%",
    accentForeground: "210 20% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "210 20% 98%",
    border: "215 27.9% 16.9%",
    input: "215 27.9% 16.9%",
    ring: "263.4 70% 50.4%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
  },
  Purple: {
    light: {
    background: '0 0% 100%',
    foreground: '240 10% 4.1%',
    card: '0 0% 100%',
    cardForeground: '240 10% 4.1%',
    popover: '0 0% 100%',
    popoverForeground: '240 10% 4.1%',
    primary: '240 85% 50%',
    primaryForeground: '210 20% 98%',
    secondary: '240 50% 95.9%',
    secondaryForeground: '240 30% 11%',
    muted: '240 50% 95.9%',
    mutedForeground: '240 10% 46.1%',
    accent: '240 50% 95.9%',
    accentForeground: '240 30% 11%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 20% 98%',
    border: '240 40% 90%',
    input: '240 40% 90%',
    ring: '240 85% 50%',
    radius: '1rem',
    chart: {
      chart1: '12 76% 61%',
      chart2: '173 58% 39%',
      chart3: '197 37% 24%',
      chart4: '43 74% 66%',
      chart5: '27 87% 67%',
    },
  },
  dark: {
    background: '240 10% 4.1%',
    foreground: '210 20% 98%',
    card: '240 10% 4.1%',
    cardForeground: '210 20% 98%',
    popover: '240 10% 4.1%',
    popoverForeground: '210 20% 98%',
    primary: '240 90% 60%',
    primaryForeground: '210 20% 98%',
    secondary: '240 30% 16.9%',
    secondaryForeground: '210 20% 98%',
    muted: '240 30% 16.9%',
    mutedForeground: '240 10% 64.9%',
    accent: '240 30% 16.9%',
    accentForeground: '210 20% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 20% 98%',
    border: '240 30% 16.9%',
    input: '240 30% 16.9%',
    ring: '240 90% 60%',
    chart: {
      chart1: '220 70% 50%',
      chart2: '160 60% 45%',
      chart3: '30 80% 55%',
      chart4: '280 65% 60%',
      chart5: '340 75% 55%',
    },
  },
  },
  Fuchsia: {
    light: {
    background: '0 0% 100%',
    foreground: '300 80% 4.1%',
    card: '0 0% 100%',
    cardForeground: '300 80% 4.1%',
    popover: '0 0% 100%',
    popoverForeground: '300 80% 4.1%',
    primary: '300 80% 57.8%',
    primaryForeground: '210 20% 98%',
    secondary: '300 30% 95.9%',
    secondaryForeground: '300 40% 11%',
    muted: '300 30% 95.9%',
    mutedForeground: '300 10% 46.1%',
    accent: '300 30% 95.9%',
    accentForeground: '300 40% 11%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 20% 98%',
    border: '300 40% 90%',
    input: '300 40% 90%',
    ring: '300 80% 57.8%',
    radius: '1rem',
    chart: {
      chart1: '12 76% 61%',
      chart2: '173 58% 39%',
      chart3: '197 37% 24%',
      chart4: '43 74% 66%',
      chart5: '27 87% 67%',
    },
  },
  dark: {
    background: '300 80% 4.1%',
    foreground: '210 20% 98%',
    card: '300 80% 4.1%',
    cardForeground: '210 20% 98%',
    popover: '300 80% 4.1%',
    popoverForeground: '210 20% 98%',
    primary: '300 90% 50.4%',
    primaryForeground: '210 20% 98%',
    secondary: '300 30% 16.9%',
    secondaryForeground: '210 20% 98%',
    muted: '300 30% 16.9%',
    mutedForeground: '300 10% 64.9%',
    accent: '300 30% 16.9%',
    accentForeground: '210 20% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 20% 98%',
    border: '300 30% 16.9%',
    input: '300 30% 16.9%',
    ring: '300 90% 50.4%',
    chart: {
      chart1: '220 70% 50%',
      chart2: '160 60% 45%',
      chart3: '30 80% 55%',
      chart4: '280 65% 60%',
      chart5: '340 75% 55%',
    },
  },
  },
  Pink: {
    light: {
      background: '0 0% 100%',
      foreground: '340 80% 10%',
      card: '0 0% 100%',
      cardForeground: '340 80% 10%',
      popover: '0 0% 100%',
      popoverForeground: '340 80% 10%',
      primary: '330 100% 70%',
      primaryForeground: '0 0% 10%',
      secondary: '340 10% 95%',
      secondaryForeground: '340 70% 10%',
      muted: '340 10% 95%',
      mutedForeground: '340 40% 30%',
      accent: '340 10% 95%',
      accentForeground: '340 70% 10%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '0 0% 98%',
      border: '340 10% 90%',
      input: '340 10% 90%',
      ring: '330 100% 70%',
      radius: '1rem',
      chart: {
        chart1: '12 76% 61%',
        chart2: '173 58% 39%',
        chart3: '197 37% 24%',
        chart4: '43 74% 66%',
        chart5: '27 87% 67%',
      },
    },
    dark: {
      background: '340 80% 10%',
      foreground: '0 0% 95%',
      card: '340 80% 10%',
      cardForeground: '0 0% 95%',
      popover: '340 80% 10%',
      popoverForeground: '0 0% 95%',
      primary: '330 100% 50%',
      primaryForeground: '0 0% 95%',
      secondary: '340 10% 30%',
      secondaryForeground: '0 0% 95%',
      muted: '340 10% 30%',
      mutedForeground: '340 30% 60%',
      accent: '340 10% 30%',
      accentForeground: '0 0% 95%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '0 0% 95%',
      border: '340 10% 30%',
      input: '340 10% 30%',
      ring: '330 100% 50%',
      chart: {
        chart1: '220 70% 50%',
        chart2: '160 60% 45%',
        chart3: '30 80% 55%',
        chart4: '280 65% 60%',
        chart5: '340 75% 55%',
      },
    },
  },
  Rose: {
  light: {
    background: "0 0% 100%",
    foreground: "240 10% 3.9%",
    card: "0 0% 100%",
    cardForeground: "240 10% 3.9%",
    popover: "0 0% 100%",
    popoverForeground: "240 10% 3.9%",
    primary: "346.8 77.2% 49.8%",
    primaryForeground: "355.7 100% 97.3%",
    secondary: "240 4.8% 95.9%",
    secondaryForeground: "240 5.9% 10%",
    muted: "240 4.8% 95.9%",
    mutedForeground: "240 3.8% 46.1%",
    accent: "240 4.8% 95.9%",
    accentForeground: "240 5.9% 10%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "0 0% 98%",
    border: "240 5.9% 90%",
    input: "240 5.9% 90%",
    ring: "346.8 77.2% 49.8%",
    radius: "1rem",
    chart: {
      chart1: "12 76% 61%",
      chart2: "173 58% 39%",
      chart3: "197 37% 24%",
      chart4: "43 74% 66%",
      chart5: "27 87% 67%",
    },
  },
  dark: {
    background: "20 14.3% 4.1%",
    foreground: "0 0% 95%",
    card: "24 9.8% 10%",
    cardForeground: "0 0% 95%",
    popover: "0 0% 9%",
    popoverForeground: "0 0% 95%",
    primary: "346.8 77.2% 49.8%",
    primaryForeground: "355.7 100% 97.3%",
    secondary: "240 3.7% 15.9%",
    secondaryForeground: "0 0% 98%",
    muted: "0 0% 15%",
    mutedForeground: "240 5% 64.9%",
    accent: "12 6.5% 15.1%",
    accentForeground: "0 0% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "0 85.7% 97.3%",
    border: "240 3.7% 15.9%",
    input: "240 3.7% 15.9%",
    ring: "346.8 77.2% 49.8%",
    chart: {
      chart1: "220 70% 50%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
},
};



export default function setGlobalThemeColorTheme(
    themeMode: "light" | "dark",
    color: keyof typeof themes,
) {
    const theme = themes[color][themeMode];

    // Set theme properties
    for (const key in theme) {
        if (key !== 'chart') {
            document.documentElement.style.setProperty(
                `--${key}`,
                (theme as any)[key],
            );
        }
    }

    if (theme.chart) {
        for (const chartKey in theme.chart) {
            document.documentElement.style.setProperty(
                `--chart-${chartKey}`,
                (theme.chart as any)[chartKey],
            );
        }
    }
}

   