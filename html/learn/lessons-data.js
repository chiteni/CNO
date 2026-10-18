/* Curriculum data for the Learn HTML course.
   Sourced from HTML_Basics_HTML_Only_Final_Goal_and_Chapters.pdf (concepts, examples, base exercises)
   and HTML_Code_Quest_With_Previews_And_Solutions.pptx (Training Mode / Boss Round missions + sample solutions). */
(() => {
  const C = window.ExerciseChecker;

  const FINAL_GOAL_CODE = `<!DOCTYPE html>
<html>
<head>
<title>My Profile</title>
</head>
<body>
<header>
<h1>Welcome to My Website</h1>
<p>My first complete HTML page.</p>
</header>
<main>
<section>
<h2>About Me</h2>
<img src="../images/face01.png" alt="My photo" width="120">
<p>My name is <strong>Alex</strong> and I <em>love</em> technology.</p>
</section>
<section>
<h2>My Hobbies</h2>
<ul>
<li>Football</li>
<li>Gaming</li>
<li>Music</li>
</ul>
</section>
<section>
<h2>Favorite Website</h2>
<a href="https://www.youtube.com">Visit YouTube</a>
</section>
<section>
<h2>Contact</h2>
<label>Name:</label>
<input type="text">
<button>Send</button>
</section>
<section>
<h2>School Schedule</h2>
<table border="1">
<tr><th>Day</th><th>Subject</th></tr>
<tr><td>Monday</td><td>Computer Science</td></tr>
</table>
</section>
</main>
<footer>
<p>My first HTML project</p>
</footer>
</body>
</html>`;

  const LESSONS = [
    {
      id: 1, slug: 'structure', title: 'Your First HTML Page', short: 'Page structure',
      goal: 'Understand the basic structure of an HTML document and display your first text.',
      mainTags: ['html', 'head', 'title', 'body'],
      teach: {
        sentence: 'The &lt;body&gt; tag holds everything people actually see on the page.',
        tag: 'body', open: '<body>', content: '\n  <h1>Hello World!</h1>\n', close: '</body>',
        extra: 'The &lt;head&gt; stores page info like the &lt;title&gt; (shown in the browser tab) — nothing in &lt;head&gt; appears on the page itself.'
      },
      watch: {
        code: `<!DOCTYPE html>\n<html>\n<head>\n<title>My First Website</title>\n</head>\n<body>\n<h1>Hello World!</h1>\n<p>This is my first website.</p>\n</body>\n</html>`,
        annotations: [
          { tag: 'title', note: 'Sets the text shown in the browser tab, not on the page.' },
          { tag: 'h1', note: 'A big heading, shown on the page.' },
          { tag: 'p', note: 'A normal paragraph of text.' },
          { tag: 'body', note: 'Everything inside here is visible on the page.' }
        ]
      },
      guided: {
        level1: {
          prompt: 'Every visible part of a page goes inside this tag. Pick the right one.',
          template: '<html>\n<head><title>My Page</title></head>\n<{{TAG}}>\n  <h1>Hello!</h1>\n</{{TAG}}>\n</html>',
          options: ['body', 'head', 'title', 'html'], answer: 'body'
        },
        level2: {
          prompt: 'Fill in the blanks so the page has a title and one heading.',
          starter: `<!DOCTYPE html>\n<html>\n<head>\n<title>___</title>\n</head>\n<body>\n<h1>___</h1>\n</body>\n</html>`,
          checks: [
            C.hasTag('title', { label: 'title' }),
            C.hasNonEmptyText('title', { label: '<title>' }),
            C.hasTag('h1', { label: 'heading' }),
            C.hasNonEmptyText('h1', { label: 'heading' })
          ]
        },
        level3: {
          prompt: 'This page is missing something. Can you fix it?',
          broken: `<!DOCTYPE html>\n<html>\n<head>\n<title>My Page</title>\n</head>\n<body>\n<h1>Hello World!\n</body>\n</html>`,
          hint: 'Every opening tag needs a matching closing tag. Which one never got closed?',
          checks: [C.hasTag('h1'), C.hasNonEmptyText('h1')]
        },
        level4: {
          prompt: 'Create your own first page. Give it a title, then say hello in a big heading.',
          hints: ['Start with <!DOCTYPE html>.', 'Main boxes: <html>, <head>, <body>.', 'Visible text goes inside <body>.'],
          starter: '',
          checks: [
            C.hasTag('title', { label: 'title' }), C.hasNonEmptyText('title', { label: '<title>' }),
            C.hasTag('h1', { label: 'heading' }), C.hasNonEmptyText('h1', { label: 'heading' })
          ]
        }
      },
      independent: {
        title: 'My Tiny Page', instructions: ['Make a page titled My Space.', 'Show one big heading with your name.', 'Add one sentence about something you like.'],
        referenceCode: `<!DOCTYPE html>\n<html>\n<head>\n<title>My Space</title>\n</head>\n<body>\n<h1>Alex</h1>\n<p>I love football.</p>\n</body>\n</html>`,
        checks: [
          C.hasTag('title'), C.hasNonEmptyText('title', { label: '<title>' }),
          C.hasTag('h1'), C.hasNonEmptyText('h1', { label: 'heading' }),
          C.hasTag('p'), C.hasNonEmptyText('p', { label: 'paragraph' })
        ],
        extraChallenge: 'Add a second paragraph saying what you enjoy doing.'
      },
      correction: {
        broken: '<h1>Hello World!<h1>',
        explain: 'Your heading needs a closing tag. A closing tag starts with a / before the tag name.',
        fixed: '<h1>Hello World!</h1>',
        followUp: { prompt: 'Now you try — fix this one:', broken: '<p>My favorite subject is Computer Science<p>', checks: [C.hasTag('p'), C.hasNonEmptyText('p')] }
      },
      completion: { summary: 'You now know how to build the basic structure of a webpage.', tagsMastered: ['html', 'head', 'title', 'body', 'h1'] }
    },

    {
      id: 2, slug: 'headings-paragraphs', title: 'Headings and Paragraphs', short: 'Headings & paragraphs',
      goal: 'Use headings and paragraphs to organize text clearly.',
      mainTags: ['h1', 'h2', 'h3', 'p'],
      teach: {
        sentence: 'HTML has six heading levels, from &lt;h1&gt; (biggest) to &lt;h6&gt; (smallest).',
        tag: 'h2', open: '<h2>', content: 'Football', close: '</h2>',
        extra: 'Use &lt;p&gt; for ordinary paragraph text underneath a heading.'
      },
      watch: {
        code: `<h1>My Favorite Sport</h1>\n\n<h2>Football</h2>\n<p>I enjoy playing football with my friends.</p>\n\n<h2>My Favorite Player</h2>\n<p>My favorite player is Cristiano Ronaldo.</p>`,
        annotations: [
          { tag: 'h1', note: 'The one main title for the whole page.' },
          { tag: 'h2', note: 'A smaller heading that introduces a new topic.' },
          { tag: 'p', note: 'The normal text explaining each topic.' }
        ]
      },
      guided: {
        level1: {
          prompt: 'This should be the ONE big main title of the page. Pick the right tag.',
          template: '<{{TAG}}>My Hobbies</{{TAG}}>\n<p>Welcome to my page.</p>', options: ['h1', 'p', 'h6', 'a'], answer: 'h1'
        },
        level2: {
          prompt: 'Complete the page: a main title, a smaller heading, and a paragraph under it.',
          starter: `<h1>___</h1>\n\n<h2>___</h2>\n<p>___</p>`,
          checks: [C.hasTag('h1'), C.hasNonEmptyText('h1'), C.hasTag('h2'), C.hasNonEmptyText('h2'), C.hasTag('p'), C.hasNonEmptyText('p')]
        },
        level3: {
          prompt: 'Something is wrong with the headings here. Fix it.',
          broken: `<h1>My Hobbies</h2>\n<p>I like music.</p>`,
          hint: 'Check that each opening tag has a matching closing tag of the same name.',
          checks: [C.hasTag('h1'), C.hasNonEmptyText('h1')]
        },
        level4: {
          prompt: 'Make a page called "My Weekend". Add one main heading, two smaller headings, and a short paragraph under each.',
          hints: ['Main title: <h1>.', 'Smaller titles: <h2>.', 'Normal text: <p>.'],
          starter: '',
          checks: [C.hasTag('h1'), C.hasNonEmptyText('h1'), C.hasTag('h2', { min: 2, label: '<h2> headings' }), C.hasTag('p', { min: 2, label: 'paragraphs' })]
        }
      },
      independent: {
        title: 'My Favorite Thing', instructions: ['Choose a game, sport, food, artist, or hobby.', 'Give the page one main heading.', 'Add three mini sections, each with its own heading and a sentence.'],
        referenceCode: `<h1>My Favorite Game</h1>\n<h2>What I Play</h2>\n<p>I enjoy Minecraft.</p>\n<h2>Why I Love It</h2>\n<p>I can build anything.</p>\n<h2>My Favorite Part</h2>\n<p>I like exploring new worlds.</p>`,
        checks: [C.hasTag('h1'), C.hasNonEmptyText('h1'), C.hasTag('h2', { min: 3, label: '<h2> headings' }), C.hasTag('p', { min: 3, label: 'paragraphs' })],
        extraChallenge: 'Try adding an <h3> heading inside one section.'
      },
      correction: {
        broken: '<h1>Hello World!<h1>',
        explain: 'Your heading needs a closing tag. Closing tags contain a / before the tag name.',
        fixed: '<h1>Hello World!</h1>',
        followUp: { prompt: 'Now you try — fix this one:', broken: '<p>My favorite subject is Computer Science<p>', checks: [C.hasTag('p'), C.hasNonEmptyText('p')] }
      },
      completion: { summary: 'You now know how to create headings and paragraphs.', tagsMastered: ['h1', 'h2', 'p'] }
    },

    {
      id: 3, slug: 'text-formatting', title: 'Text Formatting', short: 'Text formatting',
      goal: 'Make important words stand out.',
      mainTags: ['strong', 'em', 'mark', 'sub', 'sup'],
      teach: {
        sentence: '&lt;strong&gt; makes text important (shown bold).',
        tag: 'strong', open: '<strong>', content: 'Alex', close: '</strong>',
        extra: '&lt;em&gt; adds emphasis (shown italic), and &lt;mark&gt; highlights text, like a highlighter pen.'
      },
      watch: {
        code: `<p>\n  My name is <strong>Alex</strong>.\n  I really <em>love</em> music.\n</p>\n<p>\n  My favorite subject is <mark>Computer Science</mark>.\n</p>`,
        annotations: [
          { tag: 'strong', note: 'Marks text as important — browsers show it bold.' },
          { tag: 'em', note: 'Adds emphasis — browsers show it italic.' },
          { tag: 'mark', note: 'Highlights text, like a highlighter pen.' },
          { tag: 'p', note: 'The paragraph holding all this text.' }
        ]
      },
      guided: {
        level1: {
          prompt: 'Which tag makes a word show up bold and important?',
          template: 'My name is <{{TAG}}>Alex</{{TAG}}>.', options: ['strong', 'mark', 'p', 'h1'], answer: 'strong'
        },
        level2: {
          prompt: 'Complete this paragraph using strong, em, and mark.',
          starter: `<p>\n  My name is <strong>___</strong>.\n  I really <em>___</em> music.\n  My favorite subject is <mark>___</mark>.\n</p>`,
          checks: [C.hasTag('strong'), C.hasNonEmptyText('strong'), C.hasTag('em'), C.hasNonEmptyText('em'), C.hasTag('mark'), C.hasNonEmptyText('mark')]
        },
        level3: {
          prompt: 'One of these formatting tags is broken. Fix it.',
          broken: `<p>My name is <strong>Alex</strong>. I <em>love</em> music. My subject is <mark>Art</mark></p>`,
          hint: 'Count the opening and closing tags carefully — one closing tag is missing.',
          checks: [C.hasTag('mark'), C.hasNonEmptyText('mark')]
        },
        level4: {
          prompt: 'Write: "My name is ___ and I love ___." Make your name important, your hobby emphasized, and highlight one favorite subject.',
          hints: ['Important: <strong>.', 'Emphasis: <em>.', 'Highlight: <mark>.'],
          starter: '',
          checks: [C.hasTag('strong'), C.hasNonEmptyText('strong'), C.hasTag('em'), C.hasNonEmptyText('em'), C.hasTag('mark'), C.hasNonEmptyText('mark')]
        }
      },
      independent: {
        title: 'Bio Remix', instructions: ['Write three short sentences about yourself.', 'Make one word bold/important.', 'Emphasize another word, and highlight one more.'],
        referenceCode: `<p>I am <strong>Alex</strong>.</p>\n<p>I <em>love</em> playing football.</p>\n<p>My favorite color is <mark>blue</mark>.</p>`,
        checks: [C.hasTag('p', { min: 3, label: 'sentences' }), C.hasTag('strong'), C.hasNonEmptyText('strong'), C.hasTag('em'), C.hasNonEmptyText('em'), C.hasTag('mark'), C.hasNonEmptyText('mark')],
        extraChallenge: 'Try <sub> or <sup> in one extra sentence.'
      },
      correction: {
        broken: '<p>I <em>love</em music> playing games.</p>',
        explain: 'The closing tag got mixed up with the word after it. A closing tag only ever contains a / and the tag name — nothing else.',
        fixed: '<p>I <em>love</em> playing games.</p>',
        followUp: { prompt: 'Fix this one the same way:', broken: '<p>My favorite subject is <mark>Art</mark subject>.</p>', checks: [C.hasTag('mark'), C.hasNonEmptyText('mark')] }
      },
      completion: { summary: 'You now know how to make text bold, emphasized, and highlighted.', tagsMastered: ['strong', 'em', 'mark'] }
    },

    {
      id: 4, slug: 'links', title: 'Links', short: 'Links',
      goal: 'Create clickable links to other websites or pages.',
      mainTags: ['a', 'href', 'br'],
      teach: {
        sentence: 'The &lt;a&gt; tag makes clickable text. The href attribute tells the browser where to go.',
        tag: 'a', open: '<a href="https://www.google.com">', content: 'Visit Google', close: '</a>',
        extra: 'Without href, a link goes nowhere — href is required for a working link.'
      },
      watch: {
        code: `<h1>Useful Websites</h1>\n\n<a href="https://www.google.com">Visit Google</a>\n<br><br>\n<a href="https://www.youtube.com">Visit YouTube</a>`,
        annotations: [
          { tag: 'a', note: 'A clickable link — href tells the browser where it goes.' },
          { tag: 'br', note: 'A line break, used to push the next link onto a new line.' },
          { tag: 'h1', note: 'The page title.' }
        ]
      },
      guided: {
        level1: {
          prompt: 'Which tag turns text into a clickable link?',
          template: '<{{TAG}} href="https://www.google.com">Visit Google</{{TAG}}>', options: ['a', 'p', 'link', 'go'], answer: 'a'
        },
        level2: {
          prompt: 'Complete the link: give it a destination and some clickable text.',
          starter: `<h1>My Favorite Website</h1>\n<a href="___">___</a>`,
          checks: [C.hasAttr('a', 'href', { label: 'link' }), C.hasNonEmptyText('a', { label: 'link text' })]
        },
        level3: {
          prompt: 'This link is missing something important. Fix it.',
          broken: `<h1>My Links</h1>\n<a>Visit YouTube</a>`,
          hint: 'A link needs to know where it goes. Add an href attribute.',
          checks: [C.hasAttr('a', 'href'), C.hasNonEmptyText('a')]
        },
        level4: {
          prompt: 'Add a heading "My Favorite Website". Then create a clickable link to YouTube, Google, or another safe site, with fun link text.',
          hints: ['Use the <a> tag.', 'Destination goes inside href="...".', 'Shape: <a href="URL">Text</a>.'],
          starter: '',
          checks: [C.hasTag('h1'), C.hasTag('a'), C.hasAttr('a', 'href'), C.hasNonEmptyText('a')]
        }
      },
      independent: {
        title: 'Two-Link Launchpad', instructions: ['Create a page called "My Links".', 'Add two different clickable websites.', 'Give each link clear text so we know where it goes.'],
        referenceCode: `<h1>My Links</h1>\n<p><a href="https://www.google.com">Search with Google</a></p>\n<p><a href="https://www.youtube.com">Watch on YouTube</a></p>`,
        checks: [C.hasTag('h1'), C.hasTag('a', { min: 2, label: 'links' }), C.minCount('a[href]', 2, 'Both of your links need an href attribute.'), C.hasNonEmptyText('a')],
        extraChallenge: 'Make one link open in a new tab using target="_blank".'
      },
      correction: {
        broken: '<a>Visit YouTube</a>',
        explain: 'Your link is missing its href attribute, so it has nowhere to go. Add href="..." with the web address.',
        fixed: '<a href="https://www.youtube.com">Visit YouTube</a>',
        followUp: { prompt: 'Fix this link the same way:', broken: '<a>Search Google</a>', checks: [C.hasAttr('a', 'href'), C.hasNonEmptyText('a')] }
      },
      completion: { summary: 'You now know how to create clickable links to other pages.', tagsMastered: ['a', 'href', 'br'] }
    },

    {
      id: 5, slug: 'images', title: 'Images', short: 'Images',
      goal: 'Display images on a webpage.',
      mainTags: ['img', 'src', 'alt', 'width'],
      teach: {
        sentence: '&lt;img&gt; shows a picture. It has no closing tag and no content — everything is in its attributes.',
        tag: 'img', void: true, open: '<img src="cat.jpg" alt="A cute cat" width="300">',
        extra: 'src says which image file to show. alt describes it for people who can’t see it.'
      },
      watch: {
        code: `<h1>My Favorite Animal</h1>\n\n<img\n  src="cat.jpg"\n  alt="A cute cat"\n  width="300"\n>\n<p>This is my favorite animal.</p>`,
        annotations: [
          { tag: 'img', note: 'Shows the picture. src is the file, alt describes it, width sets the size.' },
          { tag: 'h1', note: 'The page title.' },
          { tag: 'p', note: 'A sentence under the picture.' }
        ]
      },
      guided: {
        level1: {
          prompt: 'Which tag shows a picture on the page?',
          template: '<h1>My Pet</h1>\n<{{TAG}} src="dog.jpg" alt="My dog" width="250">', options: ['img', 'picture', 'src', 'photo'], answer: 'img',
          selfClosing: true
        },
        level2: {
          prompt: 'Complete the image tag with a file name and a description.',
          starter: `<h1>My Picture</h1>\n<img src="___" alt="___" width="250">`,
          checks: [C.hasAttr('img', 'src', { label: 'image' }), C.hasAttr('img', 'alt', { label: 'image' })]
        },
        level3: {
          prompt: 'This image is missing something that screen readers need. Fix it.',
          broken: `<h1>My Picture</h1>\n<img src="photo.jpg" width="250">`,
          hint: 'Every <img> needs alt text describing the picture.',
          checks: [C.hasAttr('img', 'src'), C.hasAttr('img', 'alt')]
        },
        level4: {
          prompt: 'Add an image to your page using one of the ready-made pictures in ../images/ (try face01.png, car01.png, ball01.png, or house01.png). Give it alt text and a width.',
          hints: ['Use <img>.', 'File name goes in src="...".', 'Describe it with alt="..." and try width="300".'],
          starter: '', suggestedImages: ['../images/face01.png', '../images/car01.png', '../images/ball01.png', '../images/house01.png'],
          checks: [C.hasTag('img'), C.hasAttr('img', 'src'), C.hasAttr('img', 'alt')]
        }
      },
      independent: {
        title: 'Photo + Caption', instructions: ['Add a heading.', 'Show one image (try ../images/face02.png or ../images/car02.png).', 'Write one sentence under it explaining why you chose it.'],
        referenceCode: `<h1>My Favorite Animal</h1>\n<img src="../images/face02.png" alt="A cute face" width="250">\n<p>I chose this picture because it makes me smile.</p>`,
        checks: [C.hasTag('h1'), C.hasTag('img'), C.hasAttr('img', 'src'), C.hasAttr('img', 'alt'), C.hasTag('p'), C.hasNonEmptyText('p')],
        extraChallenge: 'Add a heading and one sentence under the image if you haven’t already.'
      },
      correction: {
        broken: '<img src="photo.jpg" width="250">',
        explain: 'Your image needs alt text describing it. Add alt="..." so people who can’t see the picture still know what it is.',
        fixed: '<img src="photo.jpg" alt="My favorite picture" width="250">',
        followUp: { prompt: 'Fix this image the same way:', broken: '<img src="dog.jpg" width="200">', checks: [C.hasAttr('img', 'src'), C.hasAttr('img', 'alt')] }
      },
      completion: { summary: 'You now know how to display images with src, alt, and width.', tagsMastered: ['img', 'src', 'alt', 'width'] }
    },

    {
      id: 6, slug: 'lists', title: 'Lists', short: 'Lists',
      goal: 'Organize items using bullet lists and numbered lists.',
      mainTags: ['ul', 'ol', 'li'],
      teach: {
        sentence: '&lt;ul&gt; makes a bullet list. Every item inside it goes in its own &lt;li&gt;.',
        tag: 'li', open: '<li>', content: 'Football', close: '</li>',
        extra: 'Use &lt;ol&gt; instead of &lt;ul&gt; when the order matters — it numbers the items automatically.'
      },
      watch: {
        code: `<h2>My Hobbies</h2>\n<ul>\n<li>Football</li>\n<li>Gaming</li>\n<li>Music</li>\n</ul>\n\n<h2>My Morning</h2>\n<ol>\n<li>Wake up</li>\n<li>Eat breakfast</li>\n<li>Go to school</li>\n</ol>`,
        annotations: [
          { tag: 'ul', note: 'A bullet list — order doesn’t matter.' },
          { tag: 'ol', note: 'A numbered list — order matters.' },
          { tag: 'li', note: 'One item inside a list.' },
          { tag: 'h2', note: 'A heading introducing each list.' }
        ]
      },
      guided: {
        level1: {
          prompt: 'Which tag wraps every single item inside a list?',
          template: '<ul>\n<{{TAG}}>Football</{{TAG}}>\n<{{TAG}}>Gaming</{{TAG}}>\n</ul>', options: ['li', 'ul', 'item', 'p'], answer: 'li'
        },
        level2: {
          prompt: 'Complete this bullet list of hobbies.',
          starter: `<h2>My Hobbies</h2>\n<ul>\n<li>___</li>\n<li>___</li>\n<li>___</li>\n</ul>`,
          checks: [C.hasTag('ul'), C.hasTag('li', { min: 3, label: 'list items' })]
        },
        level3: {
          prompt: 'This list isn’t quite right. Fix it.',
          broken: `<h2>My Hobbies</h2>\n<ul>\n<li>Football\n<li>Gaming</li>\n</ul>`,
          hint: 'Each <li> needs its own closing tag.',
          checks: [C.hasTag('ul'), C.hasTag('li', { min: 2, label: 'list items' })]
        },
        level4: {
          prompt: 'Create a bullet list of 3 snacks you like, then a numbered Top 3 ranking of those same snacks. Add a heading above each list.',
          hints: ['Bullets: <ul>.', 'Numbers: <ol>.', 'Every item: <li>...</li>.'],
          starter: '',
          checks: [C.hasTag('ul'), C.hasTag('ol'), C.minCount('ul li', 3, 'Your bullet list needs at least 3 items.'), C.minCount('ol li', 3, 'Your numbered list needs at least 3 items.')]
        }
      },
      independent: {
        title: 'After-School Plan', instructions: ['Make one list of things you can do after school.', 'Make another list ranking your top 3 favorite activities.', 'Use at least 3 items in each list.'],
        referenceCode: `<h2>After School</h2>\n<ul>\n<li>Play football</li>\n<li>Listen to music</li>\n<li>Read a book</li>\n</ul>\n<h2>My Top 3 Activities</h2>\n<ol>\n<li>Playing guitar</li>\n<li>Gaming</li>\n<li>Drawing</li>\n</ol>`,
        checks: [C.hasTag('ul'), C.hasTag('ol'), C.minCount('ul li', 3, 'Your bullet list needs at least 3 items.'), C.minCount('ol li', 3, 'Your numbered list needs at least 3 items.')],
        extraChallenge: 'Create a Top 3 Movies numbered list too.'
      },
      correction: {
        broken: '<ul>\n<li>Chips\n<li>Popcorn</li>\n</ul>',
        explain: 'The first list item never got closed, so the second one ended up stuck inside it. Close every <li> with </li>.',
        fixed: '<ul>\n<li>Chips</li>\n<li>Popcorn</li>\n</ul>',
        followUp: { prompt: 'Fix this list the same way:', broken: '<ol>\n<li>Wake up\n<li>Eat breakfast</li>\n</ol>', checks: [C.hasTag('ol'), C.hasTag('li', { min: 2 })] }
      },
      completion: { summary: 'You now know how to build bullet lists and numbered lists.', tagsMastered: ['ul', 'ol', 'li'] }
    },

    {
      id: 7, slug: 'sections', title: 'Divs and Page Sections', short: 'Divs & sections',
      goal: 'Group related content into clear parts of a webpage.',
      mainTags: ['header', 'main', 'section', 'div', 'footer'],
      teach: {
        sentence: '&lt;section&gt; groups related content together, like a chapter of the page.',
        tag: 'section', open: '<section>', content: '\n  <h2>About Me</h2>\n  <p>I am 15.</p>\n', close: '</section>',
        extra: '&lt;header&gt; is the top of the page, &lt;main&gt; is the big middle part, &lt;footer&gt; is the bottom. &lt;div&gt; is a plain container with no special meaning.'
      },
      watch: {
        code: `<header>\n<h1>Alex's Website</h1>\n</header>\n\n<main>\n<section>\n<h2>About Me</h2>\n<p>I am 15 years old.</p>\n</section>\n<section>\n<h2>My Hobbies</h2>\n<p>I love music and football.</p>\n</section>\n</main>\n\n<footer>\n<p>Made by Alex</p>\n</footer>`,
        annotations: [
          { tag: 'header', note: 'The top of the page — usually the title.' },
          { tag: 'main', note: 'The big middle area holding the page’s real content.' },
          { tag: 'section', note: 'One grouped part of the content, with its own heading.' },
          { tag: 'footer', note: 'The bottom of the page.' }
        ]
      },
      guided: {
        level1: {
          prompt: 'Which tag marks the very bottom of the page?',
          template: '<header>...</header>\n<main>...</main>\n<{{TAG}}>\n<p>Made by Alex</p>\n</{{TAG}}>', options: ['footer', 'header', 'bottom', 'end'], answer: 'footer'
        },
        level2: {
          prompt: 'Complete this page layout: a header with a title, two sections, and a footer.',
          starter: `<header>\n<h1>___</h1>\n</header>\n<main>\n<section>\n<h2>___</h2>\n<p>___</p>\n</section>\n<section>\n<h2>___</h2>\n<p>___</p>\n</section>\n</main>\n<footer>\n<p>___</p>\n</footer>`,
          checks: [C.hasTag('header'), C.hasTag('main'), C.hasTag('section', { min: 2, label: 'sections' }), C.hasTag('footer')]
        },
        level3: {
          prompt: 'One of these page parts never got closed. Fix it.',
          broken: `<header>\n<h1>Alex's Website</h1>\n</header>\n<main>\n<section>\n<h2>About Me</h2>\n<p>I am Alex.</p>\n</main>\n<footer>\n<p>Made by Alex</p>\n</footer>`,
          hint: 'Count the <section> tags — does every opening one have a closing one?',
          checks: [C.hasTag('header'), C.hasTag('main'), C.hasTag('section'), C.hasTag('footer')]
        },
        level4: {
          prompt: 'Organize your page: put the title in a header, two content sections inside main, and finish with a footer saying "Made by ___".',
          hints: ['Top: <header>.', 'Middle: <main> + <section>.', 'Bottom: <footer>.'],
          starter: '',
          checks: [C.hasTag('header'), C.hasTag('main'), C.hasTag('section', { min: 2, label: 'sections' }), C.hasTag('footer')]
        }
      },
      independent: {
        title: 'Gaming Club Page', instructions: ['Create a tiny page for a school gaming club.', 'Organize it into a top area, main content, two sections, and a bottom area.', 'Add simple text inside every part.'],
        referenceCode: `<header><h1>Gaming Club</h1></header>\n<main>\n<section>\n<h2>About Our Club</h2>\n<p>We play games together.</p>\n</section>\n<section>\n<h2>When We Meet</h2>\n<p>Friday after school.</p>\n</section>\n</main>\n<footer><p>School Gaming Club</p></footer>`,
        checks: [C.hasTag('header'), C.hasTag('main'), C.hasTag('section', { min: 2, label: 'sections' }), C.hasTag('footer')],
        extraChallenge: 'Add one extra section called "My Goals".'
      },
      correction: {
        broken: '<section>\n<h2>About Me</h2>\n<p>I am Alex.</p>',
        explain: 'Your <section> never got closed. Add </section> after the content that belongs inside it.',
        fixed: '<section>\n<h2>About Me</h2>\n<p>I am Alex.</p>\n</section>',
        followUp: { prompt: 'Fix this one the same way:', broken: '<footer>\n<p>Made by Alex</p>', checks: [C.hasTag('footer')] }
      },
      completion: { summary: 'You now know how to organize a page with header, main, section, and footer.', tagsMastered: ['header', 'main', 'section', 'footer'] }
    },

    {
      id: 8, slug: 'inputs-buttons', title: 'Buttons and Basic Inputs', short: 'Inputs & buttons',
      goal: 'Add simple controls that users can see and use.',
      mainTags: ['label', 'input', 'type', 'button'],
      teach: {
        sentence: '&lt;input&gt; makes a box people can type into. type="text" makes a normal text box.',
        tag: 'input', void: true, open: '<input type="text">',
        extra: 'The controls don’t need to do anything yet — JavaScript will make them interactive later. We’re only learning how to place them.'
      },
      watch: {
        code: `<h2>Contact Me</h2>\n\n<label>Your name:</label>\n<input type="text">\n<br><br>\n<label>Your age:</label>\n<input type="number">\n<br><br>\n<button>Send</button>`,
        annotations: [
          { tag: 'label', note: 'Describes what should go in the input next to it.' },
          { tag: 'input', note: 'A box the user can type into. type controls what kind of box.' },
          { tag: 'button', note: 'A clickable button.' }
        ]
      },
      guided: {
        level1: {
          prompt: 'Which tag creates a box someone can type into?',
          template: '<label>Your name:</label>\n<{{TAG}} type="text">', options: ['input', 'label', 'button', 'text'], answer: 'input'
        },
        level2: {
          prompt: 'Complete this tiny contact form.',
          starter: `<h2>Contact Me</h2>\n<label>Your name:</label>\n<input type="___">\n<br><br>\n<button>___</button>`,
          checks: [C.hasTag('input'), C.hasAttr('input', 'type', { label: 'input' }), C.hasTag('button'), C.hasNonEmptyText('button', { label: 'button' })]
        },
        level3: {
          prompt: 'This button looks empty to users. Fix it.',
          broken: `<h2>Contact Me</h2>\n<label>Your name:</label>\n<input type="text">\n<button></button>`,
          hint: 'A <button> needs text inside it so people know what it does.',
          checks: [C.hasTag('button'), C.hasNonEmptyText('button')]
        },
        level4: {
          prompt: 'Add a field for the student name and a field for favorite subject, then a button that says "Vote".',
          hints: ['Text field: <input type="text">.', 'Text before a field: <label>.', 'Button: <button>Vote</button>.'],
          starter: '',
          checks: [C.minCount('input', 2, 'Add two input fields: one for name, one for favorite subject.'), C.hasTag('button'), C.hasNonEmptyText('button')]
        }
      },
      independent: {
        title: 'Join the Club', instructions: ['Make a tiny sign-up form.', 'Ask for name, email, and age.', 'Finish with a "Join" button.'],
        referenceCode: `<h2>Join the Club</h2>\n<label>Name:</label>\n<input type="text">\n<br>\n<label>Email:</label>\n<input type="email">\n<br>\n<label>Age:</label>\n<input type="number">\n<br>\n<button>Join</button>`,
        checks: [C.minCount('input', 3, 'Add three input fields: name, email, and age.'), C.minCount('input[type]', 1, 'Give your inputs a type, like text, email, or number.'), C.hasTag('button'), C.hasNonEmptyText('button')],
        extraChallenge: 'Add an email input using type="email".'
      },
      correction: {
        broken: '<button></button>',
        explain: 'Your button needs some text inside it, so people know what it will do when clicked.',
        fixed: '<button>Send</button>',
        followUp: { prompt: 'Fix this one the same way:', broken: '<button></button>', checks: [C.hasTag('button'), C.hasNonEmptyText('button')] }
      },
      completion: { summary: 'You now know how to add labels, inputs, and buttons to a page.', tagsMastered: ['label', 'input', 'button'] }
    },

    {
      id: 9, slug: 'tables', title: 'Tables', short: 'Tables',
      goal: 'Show information in rows and columns.',
      mainTags: ['table', 'tr', 'th', 'td'],
      teach: {
        sentence: '&lt;table&gt; holds rows and columns. &lt;tr&gt; is one row; &lt;th&gt; is a heading cell, &lt;td&gt; is a normal cell.',
        tag: 'td', open: '<td>', content: 'Monday', close: '</td>',
        extra: 'Use a table only when the information really belongs in rows and columns, like a schedule or scoreboard.'
      },
      watch: {
        code: `<table border="1">\n<tr>\n<th>Day</th>\n<th>Subject</th>\n</tr>\n<tr>\n<td>Monday</td>\n<td>Math</td>\n</tr>\n<tr>\n<td>Tuesday</td>\n<td>Computer Science</td>\n</tr>\n</table>`,
        annotations: [
          { tag: 'table', note: 'The whole grid of rows and columns.' },
          { tag: 'tr', note: 'One row of the table.' },
          { tag: 'th', note: 'A heading cell, usually the top row.' },
          { tag: 'td', note: 'A normal data cell.' }
        ]
      },
      guided: {
        level1: {
          prompt: 'Which tag marks a normal data cell (not a heading)?',
          template: '<tr><th>Day</th><th>Subject</th></tr>\n<tr><{{TAG}}>Monday</{{TAG}}><{{TAG}}>Math</{{TAG}}></tr>', options: ['td', 'th', 'tr', 'cell'], answer: 'td'
        },
        level2: {
          prompt: 'Complete this two-column table with a heading row and one data row.',
          starter: `<table border="1">\n<tr><th>___</th><th>___</th></tr>\n<tr><td>___</td><td>___</td></tr>\n</table>`,
          checks: [C.hasTag('table'), C.hasTag('tr', { min: 2, label: 'rows' }), C.hasTag('th', { min: 2, label: 'heading cells' }), C.hasTag('td', { min: 2, label: 'data cells' })]
        },
        level3: {
          prompt: 'One row in this table is missing its closing tag. Fix it.',
          broken: `<table border="1">\n<tr><th>Day</th><th>Subject</th></tr>\n<tr><td>Monday</td><td>Math>\n</table>`,
          hint: 'Check every <td> — does each one have a matching </td>?',
          checks: [C.hasTag('table'), C.hasTag('td', { min: 2, label: 'data cells' })]
        },
        level4: {
          prompt: 'Create a table with two columns: Player and Score. Add the heading row, then 3 players with made-up scores.',
          hints: ['Table: <table>.', 'Row: <tr>.', 'Heading cell: <th> • Normal cell: <td>.'],
          starter: '',
          checks: [C.hasTag('table'), C.hasTag('th', { min: 2, label: 'heading cells' }), C.minCount('tr', 4, 'Add a heading row plus 3 player rows (4 rows total).'), C.minCount('td', 6, 'Add 3 players, each with a name and a score (6 data cells).')]
        }
      },
      independent: {
        title: 'Mini Timetable', instructions: ['Create a school timetable.', 'Use 3 columns: Day, Subject, Time.', 'Add at least 4 rows of data.'],
        referenceCode: `<h2>School Timetable</h2>\n<table border="1">\n<tr><th>Day</th><th>Subject</th><th>Time</th></tr>\n<tr><td>Mon</td><td>Math</td><td>8:00</td></tr>\n<tr><td>Tue</td><td>English</td><td>9:00</td></tr>\n<tr><td>Wed</td><td>Science</td><td>10:00</td></tr>\n<tr><td>Thu</td><td>Art</td><td>11:00</td></tr>\n</table>`,
        checks: [C.hasTag('table'), C.hasTag('th', { min: 3, label: 'column headings' }), C.minCount('tr', 5, 'Add a heading row plus at least 4 rows of data (5 rows total).')],
        extraChallenge: 'Add a third column for the class time if you haven’t already.'
      },
      correction: {
        broken: '<table border="1">\n<tr><th>Day</th><th>Subject</th></tr>\n<tr><td>Monday</td><td>Math>\n</table>',
        explain: 'One of the cells never got its closing tag, so the row and table structure broke. Close every <td> with </td>.',
        fixed: '<table border="1">\n<tr><th>Day</th><th>Subject</th></tr>\n<tr><td>Monday</td><td>Math</td></tr>\n</table>',
        followUp: { prompt: 'Fix this table the same way:', broken: '<table border="1">\n<tr><th>Player</th><th>Score</th></tr>\n<tr><td>Alex</td><td>10\n</table>', checks: [C.hasTag('table'), C.hasTag('td', { min: 2 })] }
      },
      completion: { summary: 'You now know how to build tables with rows, headings, and cells.', tagsMastered: ['table', 'tr', 'th', 'td'] }
    },

    {
      id: 10, slug: 'final-project', title: 'Final Project: Build a Complete HTML Website', short: 'Final project',
      goal: 'Rebuild the final goal page using everything you’ve learned.',
      mainTags: ['html', 'h1', 'p', 'img', 'a', 'ul', 'section', 'input', 'button', 'table', 'footer'],
      finalProject: true,
      teach: {
        sentence: 'Every tag you’ve learned works together to build one real webpage — this is where it all comes together.',
        tag: 'section', open: '<section>', content: '\n  ...everything you’ve learned...\n', close: '</section>',
        extra: 'Look back at the final goal page from the start of this course — by the end of this chapter, every part of it will make sense.'
      },
      watch: {
        code: FINAL_GOAL_CODE,
        annotations: [
          { tag: 'header', note: 'Chapter 7 — the top of the page.' },
          { tag: 'section', note: 'Chapter 7 — groups each part of the content.' },
          { tag: 'img', note: 'Chapter 5 — a picture, with src, alt, and width.' },
          { tag: 'strong', note: 'Chapter 3 — important text, shown bold.' },
          { tag: 'ul', note: 'Chapter 6 — a bullet list.' },
          { tag: 'a', note: 'Chapter 4 — a clickable link.' },
          { tag: 'input', note: 'Chapter 8 — a box people can type into.' },
          { tag: 'table', note: 'Chapter 9 — rows and columns of data.' },
          { tag: 'footer', note: 'Chapter 7 — the bottom of the page.' }
        ]
      },
      guided: {
        level1: {
          prompt: 'Which tag groups the bottom credit line of a page?',
          template: '<header>...</header>\n<main>...</main>\n<{{TAG}}><p>My first HTML project</p></{{TAG}}>', options: ['footer', 'header', 'section', 'div'], answer: 'footer'
        },
        level2: {
          prompt: 'Complete this mini recap page using one tag from each earlier chapter.',
          starter: `<header>\n<h1>___</h1>\n</header>\n<main>\n<section>\n<h2>About Me</h2>\n<img src="../images/face03.png" alt="___" width="150">\n<p>My name is <strong>___</strong>.</p>\n</section>\n</main>\n<footer>\n<p>___</p>\n</footer>`,
          checks: [C.hasTag('header'), C.hasTag('section'), C.hasTag('img'), C.hasAttr('img', 'alt'), C.hasTag('strong'), C.hasNonEmptyText('strong'), C.hasTag('footer')]
        },
        level3: {
          prompt: 'This recap page has a couple of mistakes. Fix them.',
          broken: `<header>\n<h1>My Page\n</header>\n<main>\n<section>\n<h2>About Me</h2>\n<p>I am <strong>Alex</strong>.</p>\n</section>\n</main>\n<footer>\n<p>Made by Alex</p>\n</footer>`,
          hint: 'One heading never got closed — check the <h1> inside the header.',
          checks: [C.hasTag('header'), C.hasTag('h1'), C.hasNonEmptyText('h1'), C.hasTag('footer')]
        },
        level4: {
          prompt: 'Choose ONE theme: music, sport, game, food, or travel. Build a page with a heading, paragraph, image, link, and list, organized using sections, finishing with a footer.',
          hints: ['Think: structure → content → extras.', 'Use pieces you already built in earlier chapters.', 'Do the easy parts first, then add the image/link/list.'],
          starter: '',
          checks: [C.hasTag('header'), C.hasTag('main'), C.hasTag('section'), C.hasTag('img'), C.hasAttr('img', 'alt'), C.hasTag('a'), C.hasAttr('a', 'href'), C.hasTag('ul'), C.hasTag('li'), C.hasTag('footer')]
        }
      },
      independent: {
        title: 'Final Boss: Your Complete HTML Page', instructions: ['Build your own mini personal website.', 'Include text, an image, a link, a list, a small form, and a small table.', 'Organize it clearly with a header, sections, and a footer. Make it yours.'],
        referenceCode: FINAL_GOAL_CODE,
        checks: [
          C.hasTag('header'), C.hasTag('main'), C.hasTag('section', { min: 2, label: 'sections' }), C.hasTag('footer'),
          C.hasTag('h1'), C.hasNonEmptyText('h1'), C.hasTag('p'), C.hasNonEmptyText('p'),
          C.hasTag('img'), C.hasAttr('img', 'src'), C.hasAttr('img', 'alt'),
          C.hasTag('a'), C.hasAttr('a', 'href'),
          C.hasTag('ul'), C.hasTag('li'),
          C.hasTag('input'), C.hasTag('button'),
          C.hasTag('table'), C.hasTag('tr', { min: 2, label: 'table rows' })
        ],
        extraChallenge: 'Change the project theme completely: sports club, music artist, game, school club, or travel page.'
      },
      correction: {
        broken: '<section>\n<h2>Contact</h2>\n<input type="text">\n<button>Send</button>',
        explain: 'Your <section> never got closed. Every section you open needs a matching </section>.',
        fixed: '<section>\n<h2>Contact</h2>\n<input type="text">\n<button>Send</button>\n</section>',
        followUp: { prompt: 'Fix this one the same way:', broken: '<footer>\n<p>My first HTML project</p>', checks: [C.hasTag('footer')] }
      },
      completion: { summary: 'You built a complete HTML page using structure, text, images, links, lists, sections, inputs, and tables — well done!', tagsMastered: ['html', 'head', 'body', 'h1', 'p', 'strong', 'em', 'mark', 'a', 'img', 'ul', 'ol', 'li', 'header', 'main', 'section', 'footer', 'input', 'button', 'table', 'tr', 'th', 'td'] }
    }
  ];

  window.LESSONS = LESSONS;
  window.FINAL_GOAL_CODE = FINAL_GOAL_CODE;
})();
