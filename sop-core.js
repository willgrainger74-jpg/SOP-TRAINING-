/* ═══════════════════════════════════════════════════════════════════
   ACTION GROUP TRAINING — every-install module (sop-core.js)
   The customer-experience SOP that applies to every job, every trade.
   trade: 'all' = required for every tech, whatever their division.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
const M = window.SOP.modules;
M.push({ id: `everyinstall`, trade: `all`, art: `everyinstall`, title: `Every Install — The Customer's Home`, short: `Every Install`,
  desc: `What happens on every job before, during and after the work: the introduction, the project walk, booties, red carpet and plastic, working clean, cleanup and the goodbye.`,
  expect: [`This SOP applies to every install, every trade, every customer. It is not optional on small jobs or "quick" jobs.`, `Booties go on every time you step inside. Floor protection goes down before a tool or a piece of equipment comes through the door.`, `The customer is never surprised: not by who is in their home, what is being done, what is shut off, or what it costs.`],
  sections: [
    { t: `Before you arrive`, why: `The customer starts judging the job before you knock.`, steps: [
      `Clean uniform, tucked in, name visible. Clean hands and face.`,
      `Truck clean inside and out, stocked from the job's material list, with booties, red carpet runners, plastic sheeting, drop cloths, a vacuum, a broom and trash bags on board.`,
      `Read the work order so you can tell the customer what is being installed without looking it up at the door.`,
      `Call or text the customer when you are on the way with your arrival time. If you are running late, tell them before the time you promised, not after.`,
      `No smoking or vaping in the truck on the way in, on the property, or anywhere the customer can see or smell it.`
    ] },
    { t: `Arrival & introduction`, why: `They are letting strangers into their home. The first thirty seconds decide whether they trust you.`, steps: [
      `Park on the street when you can. Do not block the customer's car or the neighbor's driveway, and ask before you park in the driveway.`,
      `Knock or ring, then step back from the door so they can see you.`,
      `Smile and introduce yourself by name and company: "Hi, I'm ___ with Action. This is ___, he's working with me today. We're here to install your ___."`,
      `Introduce every person on the crew. Nobody the customer has not met walks into the home.`,
      `Use the customer's name.`,
      `Ask before you come in, and put your booties on at the door before you step inside.`,
      `Ask about pets, children, anyone sleeping or working from home, and which door they want you to use.`
    ] },
    { t: `Walk the project with the customer`, why: `Ten minutes of walking the job with the customer prevents most complaints and most callbacks.`, steps: [
      `Ask the customer to show you the job, and walk it together: where the old equipment is, where the new equipment goes, and the route you will carry it in and out.`,
      `Say back what you are installing and where, and confirm it matches the work order. If the customer expects something that is not on the work order, call your manager before you start.`,
      `Tell them what will be shut off (water, gas, power, heating or cooling), for about how long, and when you expect to be finished.`,
      `Find the shutoffs, the electrical panel, the attic or crawl space access and the thermostat with the customer.`,
      `Point out any damage that is already there, to floors, walls, ceilings, landscaping or the equipment, and take a photo of it with the customer present.`,
      `Ask what they want moved or covered, and ask before you move anything yourself.`,
      `Ask if they have any concerns or anything you should know about the home.`,
      `Tell them how to reach you during the job and that you will come find them before anything changes.`
    ], stop: `The job is not what the work order says, or the customer was promised something different: stop and call your manager before any work starts.` },
    { t: `Protect the home: booties, red carpet & plastic`, why: `The home is protected before the first tool comes in, not after the first mark on the floor.`, steps: [
      `Booties on every time you step inside, and off every time you step out. Dirty or torn booties get replaced. Booties are not worn outside and back in.`,
      `Lay red carpet runners from the entry door to the work area before any tool, part or piece of equipment comes in.`,
      `On stairs and slick floors, tape or secure the runner so it cannot slide.`,
      `Put a drop cloth down in the work area itself, under the equipment, your tools and anywhere you will cut, drill or solder.`,
      `Cover furniture, belongings and anything nearby with plastic. Under an attic access or anywhere you are cutting overhead, hang or lay plastic to catch the dust and insulation.`,
      `Protect door frames, corners and railings on the carry route. Two people carry large equipment.`,
      `Tools and parts go on the drop cloth. Never on the customer's floors, counters, furniture or appliances.`,
      `Keep doors closed behind you for pets, children and the customer's heating or cooling.`
    ], stop: `No booties and no floor protection on the truck: do not go in without them. Get them first.` },
    { t: `Working in the home`, why: `You are a guest for the whole job, not only at the door.`, steps: [
      `No profanity, no arguing, no loud music, and no personal calls where the customer can hear.`,
      `Do not use the customer's bathroom, tools, ladder, trash cans or anything else of theirs without asking.`,
      `Bag trash and scrap as you go. Do not let it pile up in the work area.`,
      `Update the customer at the natural points: when the old equipment is out, if you find something unexpected, and before anything is shut off or turned back on.`,
      `If you find something that changes the job or the price, stop and show the customer, then call your manager. Never add work or cost without approval.`,
      `If you damage something, tell the customer and your manager right away. Do not hide it and do not try to fix it quietly.`,
      `Lunch and breaks are taken at the truck, not in the home.`,
      `Never leave the home unlocked or the job site unattended with tools and open equipment where children or pets can reach them.`
    ], stop: `Something got damaged: stop, tell the customer and call your manager. The same day, every time.` },
    { t: `Clean up after ourselves`, why: `Leave it cleaner than you found it. That is what the customer tells the neighbors about.`, steps: [
      `Haul away all old equipment, boxes, packing, scrap pipe, wire and trash. Nothing goes in the customer's cans unless they offer.`,
      `Wipe down the new equipment and everything you touched: fingerprints, flux, pipe dope, dust.`,
      `Vacuum or sweep the work area and the whole carry route.`,
      `Fold plastic and drop cloths inward so the dust and debris stay inside them, and carry them out. Roll up the red carpet last, on your way out.`,
      `Put back everything you moved, where it was.`,
      `Walk the outside: the yard, the driveway and the area around the outdoor equipment, for screws, wire clippings, tape and scrap.`,
      `Check for oil, water or mud on the driveway and clean it.`,
      `Do your own last look before you get the customer: would you be happy with this in your home?`
    ] },
    { t: `Final walkthrough & goodbye`, why: `The last ten minutes are what the review gets written about.`, steps: [
      `Bring the customer to the work and show them what was installed, running.`,
      `Show them how to use it: the controls, the shutoffs, and any maintenance that is theirs to do.`,
      `Walk the carry route and the work area with them so they see it clean.`,
      `Ask: "Is there anything you'd like us to take care of before we go?" Then take care of it.`,
      `Go over the paperwork, leave the manuals and warranty information, and put the Action sticker on the equipment.`,
      `Ask for the review.`,
      `Thank them by name.`,
      `Take your after photos, including the clean work area.`,
      `Call or text dispatch before you pull away, and log the job the same day.`
    ] }
  ],
  checklist: [`Customer called or texted with arrival time`, `Uniform clean, truck clean and stocked`, `Whole crew introduced by name`, `Project walked with the customer before work started`, `Work order confirmed with the customer`, `Customer told what is shut off and for how long`, `Existing damage photographed with the customer`, `Booties worn every time inside`, `Red carpet from the door to the work area`, `Drop cloth under the work, plastic over belongings`, `Tools kept on the drop cloth`, `Customer updated during the job`, `No added work or cost without approval`, `Old equipment and all trash hauled away`, `Equipment wiped down, area vacuumed or swept`, `Everything moved put back`, `Yard and driveway checked`, `Customer walked through the finished job`, `Asked if there is anything else before leaving`, `Review asked for, dispatch called`],
  record: [`Job address and date`, `Customer name`, `Arrival time promised and actual`, `Existing damage noted (photos)`, `Anything that changed from the work order, and who approved it`, `Customer walkthrough completed (yes/no)`, `Lead installer and helper names`],
  quiz: [
    { q: `When do booties go on?`, a: [`Every time you step inside, at the door`, `Only on carpet`, `Only when it is raining or muddy`, `Once in the morning, and they stay on all day inside and out`], r: `Protect the home` },
    { q: `You step out to the truck in your booties. What happens before you go back in?`, a: [`Clean booties go on at the door; booties are not worn outside and back in`, `Nothing, they are already on`, `Wipe them on the mat`, `Take them off and go in with boots`], r: `Protect the home` },
    { q: `When does the red carpet go down?`, a: [`Before any tool, part or equipment comes through the door`, `After the old equipment is out`, `Only if the customer asks`, `At cleanup, to carry out trash`], r: `Protect the home` },
    { q: `Where do the red carpet runners run?`, a: [`From the entry door to the work area`, `Only in the work area`, `Only on the stairs`, `Around the outdoor unit`], r: `Protect the home` },
    { q: `Where do tools and parts get set down?`, a: [`On the drop cloth`, `On the kitchen counter, on a rag`, `On the washer or dryer`, `On the floor next to the work`], r: `Protect the home` },
    { q: `You do not have booties or floor protection on the truck. What do you do?`, a: [`Get them before going in`, `Go in with boots and be careful`, `Ask the customer for towels`, `Take your boots off and work in socks`], r: `Protect the home` },
    { q: `Who gets introduced at the door?`, a: [`Every person on the crew, by name`, `Only the lead`, `Nobody, the office already called`, `Only whoever the customer asks about`], r: `Arrival & introduction` },
    { q: `What do you do right after knocking?`, a: [`Step back from the door so they can see you`, `Open the door and call out`, `Start unloading the truck`, `Stand close so they can read your shirt`], r: `Arrival & introduction` },
    { q: `What is the project walk?`, a: [`Walking the job with the customer before work starts: where it goes, the carry route, what is shut off and for how long`, `A walk around the truck to check for tools`, `The inspection the city does`, `Something done only on jobs over two days`], r: `Walk the project with the customer` },
    { q: `The customer says the salesperson promised something that is not on the work order. What do you do?`, a: [`Stop and call your manager before any work starts`, `Do it, and add it to the invoice`, `Tell the customer it is not included and start working`, `Ignore it and install what is on the order`], r: `Walk the project with the customer` },
    { q: `You notice a scratched floor and a cracked tile on the way in. What do you do?`, a: [`Point it out and photograph it with the customer present before starting`, `Say nothing, it is not your job`, `Photograph it secretly`, `Cover it with the red carpet`], r: `Walk the project with the customer` },
    { q: `Before moving the customer's belongings out of the way, you:`, a: [`Ask first`, `Move them quickly and put them back later`, `Have the helper do it`, `Stack them outside`], r: `Walk the project with the customer` },
    { q: `Midway through, you find a problem that will add cost. What is the rule?`, a: [`Stop, show the customer, call your manager; no added work or cost without approval`, `Fix it and explain at the end`, `Fix it and do not charge`, `Leave it and say nothing`], r: `Working in the home` },
    { q: `You dent a door frame carrying equipment out. What do you do?`, a: [`Tell the customer and your manager right away`, `Touch it up quietly`, `Hope it is not noticed`, `Mention it at the next team meeting`], r: `Working in the home` },
    { q: `Where are lunch and breaks taken?`, a: [`At the truck`, `In the customer's kitchen`, `In the work area`, `On the customer's patio furniture`], r: `Working in the home` },
    { q: `Where does the job's trash go?`, a: [`Hauled away with us, unless the customer offers their cans`, `In the customer's trash cans`, `In the neighbor's dumpster`, `Left bagged by the garage`], r: `Clean up after ourselves` },
    { q: `How are plastic and drop cloths picked up?`, a: [`Folded inward so the dust and debris stay inside`, `Shaken out in the room`, `Dragged to the door`, `Left for the customer to reuse`], r: `Clean up after ourselves` },
    { q: `When is the red carpet rolled up?`, a: [`Last, on your way out`, `As soon as the new equipment is in`, `Before cleanup starts`, `It stays for the customer`], r: `Clean up after ourselves` },
    { q: `What does cleanup include outside the home?`, a: [`Walking the yard and driveway for screws, wire, tape, scrap, oil and mud`, `Nothing, the work was inside`, `Only the area by the truck`, `Mowing around the unit`], r: `Clean up after ourselves` },
    { q: `What do you ask the customer before leaving?`, a: [`"Is there anything you'd like us to take care of before we go?"`, `"Can we use your trash cans?"`, `"Do you need anything else installed?"`, `Nothing, the paperwork covers it`], r: `Final walkthrough & goodbye` },
    { q: `You are going to be 20 minutes late. When does the customer find out?`, a: [`Before the time you promised`, `When you arrive`, `Only if they call the office`, `They do not need to know`], r: `Before you arrive` },
    { q: `Which jobs does this SOP apply to?`, a: [`Every install, every trade, every customer`, `Only full system replacements`, `Only jobs inside finished living space`, `Only when a manager is on site`], r: `Before you arrive` }
  ] });
})();
