export default class ConsoleColor {
    static RESET = "\x1b[0m";
    static THEME = ConsoleColor.RESET;

    static effect(color,text=""){
        let prefix = ConsoleColor.RESET;
        switch(color.toLowerCase()){
            case "bright":
                prefix = "\x1b[1m";
                break;
            case "dim":
                prefix = "\x1b[2m";
                break;
            case "underscore":
                prefix = "\x1b[4m";
                break;
            case "blink":
                prefix = "\x1b[5m";
                break;
            case "reverse":
                prefix = "\x1b[7m";
                break;
            case "hidden":
                prefix = "\x1b[8m";
                break;
        }
        if (text) text += ConsoleColor.RESET;
        return prefix + text;
    }
    static color(effect,text=""){
        let prefix = ConsoleColor.RESET;
        switch(effect.toLowerCase()){
            case "black":
                prefix = "\x1b[30m";
                break;
            case "red":
                prefix = "\x1b[31m";
                break;
            case "green":
                prefix = "\x1b[32m";
                break;
            case "yellow":
                prefix = "\x1b[33m";
                break;
            case "blue":
                prefix = "\x1b[34m";
                break;
            case "magenta":
                prefix = "\x1b[35m";
                break;
            case "cyan":
                prefix = "\x1b[36m";
                break;
            case "white":
                prefix = "\x1b[37m";
                break;
            case "gray":
            case "grey":
                prefix = "\x1b[90m";
                break;
        }
        
        if (text) text += ConsoleColor.RESET;
        return prefix + text;
    }
    static background(background,text=""){
        let prefix = ConsoleColor.RESET;
        switch(background.toLowerCase()){
            case "black": 
                prefix = "\x1b[40m";
                break;
            case "red": 
                prefix = "\x1b[41m";
                break;
            case "green": 
                prefix = "\x1b[42m";
                break;
            case "yellow": 
                prefix = "\x1b[43m";
                break;
            case "blue": 
                prefix = "\x1b[44m";
                break;
            case "magenta": 
                prefix = "\x1b[45m";
                break;
            case "cyan": 
                prefix = "\x1b[46m";
                break;
            case "white": 
                prefix = "\x1b[47m";
                break;
            case "gray": 
            case "grey": 
                prefix = "\x1b[100m";
                break;
        }
        
        if (text) text += ConsoleColor.RESET;
        return prefix + text;
    }
    static setTheme(themeName="THEME",string){
        ConsoleColor[themeName] = string;
        // ConsoleColor.RESET = "\x1b[0m";
    }
    static get(themeName="THEME"){
        if (themeName in ConsoleColor) return ConsoleColor[themeName];
    }
    static applyTheme(themeName="THEME",text=""){
        if (text) text += ConsoleColor.RESET;
        return ConsoleColor.RESET + ConsoleColor[themeName] + text;
    }
    static use(color,text=""){
        if (text) text += ConsoleColor.RESET;
        return ConsoleColor.RESET + color + text;
    }
}