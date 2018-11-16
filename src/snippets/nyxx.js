export default {
    // for displaying on the <select> dropdown
    name: 'Nyxx (Dart)',
  
    // for highlight.js
    // see https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases
    language: 'dart',
  
    // actual generator
    // data is just a javascript object that looks like this:
    // { "content": "message content...", "embed": { ... } }
    generateFrom(data) {
        const result = [];

        if(data.embed) {
            result.push(`var embed = EmbedBuilder()`);
            
            if(data.embed.title) {
                result.push(`  ..title = ${JSON.stringify(data.embed.title)}`);
            }

            if(data.embed.description) {
                result.push(`  ..description = ${JSON.stringify(data.embed.description)}`);
            }

            if(data.embed.url) {
                result.push(`  ..url = ${JSON.stringify(data.embed.url)}`);
            }

            if(data.embed.color) {
                result.push(`  ..color = DiscordColor.fromInt(${JSON.stringify(data.embed.color)})`);
            }

            if(data.embed.timestamp) {
                result.push(`  ..timestamp = DateTime.parse(${JSON.stringify(data.embed.timestamp)})`);
            }

            if(data.embed.footer) {
                result.push(`  ..addFooter((footer) {`);
                
                if(data.embed.footer.icon_url) {
                    result.push(`    footer.iconUrl = ${JSON.stringify(data.embed.footer.icon_url)};`);
                }

                if(data.embed.footer.text) {
                    result.push(`    footer.text = ${JSON.stringify(data.embed.footer.text)};`);
                }

                result.push(`  })`);
            }

            if(data.embed.thumbnail.url) {
                result.push(`  ..thumbnailUrl = ${JSON.stringify(data.embed.thumbnail.url)}`);
            }

            if(data.embed.image.url) {
                result.push(`  ..imageUrl = ${JSON.stringify(data.embed.image.url)}`);
            }
            
            if(data.embed.author) {
                result.push(`  ..addAuthor((author) {`);
                
                if(data.embed.author.icon_url) {
                    result.push(`    author.iconUrl = ${JSON.stringify(data.embed.author.icon_url)};`);
                }

                if(data.embed.author.name) {
                    result.push(`    author.name = ${JSON.stringify(data.embed.author.name)};`);
                }

                if(data.embed.author.url) {
                    result.push(`    author.url = ${JSON.stringify(data.embed.author.url)};`);
                }

                result.push(`  })`);
            }

            if (data.embed.fields) {
                for (const field of data.embed.fields) {
                    const name = field.name ? JSON.stringify(field.name) : null;
                    const value = field.value ? JSON.stringify(field.value) : null;
                    const inline = field.inline !== undefined ? field.inline.toString() : `false`;
                    result.push(`  ..addField(name: ${name}, content: ${value}, inline: ${inline})`);
                }
            }

            result[result.length-1] += ';';
            
            result.push("\n// Send embed via appropriate method: ISend#send or CommandContext#reply");
            
            var content = data.content !== undefined ? `content: ${JSON.stringify(data.content)}, ` : ""; 
            result.push(`await channel.send(${content}embed: embed);`);

            return result.join('\n');
        }

        return "// Cannot send embed without embed :)";
    },
  };