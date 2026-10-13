"use client";

import { useState } from "react";
import { Sun, ChevronDown, ChevronRight, Lightbulb } from "lucide-react";
import Reveal from "@/Components/home/Reveal";

// Same badge silhouette as VisiMisiSection's ArchBadge (contour-traced
// from the icon-badge reference) — reused verbatim per instruction so the
// jenjang tabs share that exact shape rather than a different arch.
export const ARCH_PATH =
  "M122.5,0 C128.2,4.5 145.4,19.4 156.8,26.9 C168.2,34.4 180.9,37.9 191.1,44.9 C201.3,51.8 211.9,59.8 218.1,68.8 C224.2,77.7 223.8,90.7 227.9,98.7 C231.9,106.6 239.7,105.6 242.6,116.6 C245.4,127.6 244.6,156.5 245,164.5 L245,296 Q245,299 242.6,299 L2.4,299 Q0,299 0,296 L0,164.5 C0.4,156.5 -0.4,127.6 2.4,116.6 C5.3,105.6 13.1,106.6 17.1,98.7 C21.2,90.7 20.8,77.7 26.9,68.8 C33.1,59.8 43.7,51.8 53.9,44.9 C64.1,37.9 76.8,34.4 88.2,26.9 C99.6,19.4 116.8,4.5 122.5,0 Z";

// Jenjang tab icons — contour-traced directly from the clean icon sprite
// sheet the user supplied (threshold + cv2.findContours + approxPolyDP
// per icon, converted to a single evenodd-fill path), not hand-drawn —
// pixel-accurate reproductions of the source art rather than an
// approximation. fill=currentColor so each can be recolored per tab
// state (white when active, muted bronze when inactive) from the caller.
const PGTK_ICON_PATH =
  "M174,277 L173,278 L171,278 L170,279 L169,279 L168,280 L167,280 L165,282 L164,282 L162,284 L162,285 L160,287 L160,288 L159,289 L159,290 L158,291 L158,292 L157,293 L157,296 L156,297 L156,304 L157,305 L157,308 L158,309 L158,310 L159,311 L159,312 L160,313 L160,314 L166,320 L167,320 L169,322 L171,322 L172,323 L174,323 L175,324 L186,324 L187,323 L189,323 L190,322 L191,322 L193,320 L194,320 L201,313 L201,312 L202,311 L202,310 L203,309 L203,308 L204,307 L204,295 L203,294 L203,292 L202,291 L202,289 L200,287 L200,286 L196,282 L195,282 L193,280 L192,280 L191,279 L190,279 L189,278 L186,278 L185,277 Z M177,287 L184,287 L185,288 L186,288 L187,289 L188,289 L192,293 L192,294 L193,295 L193,297 L194,298 L194,304 L193,305 L193,306 L192,307 L192,308 L188,312 L187,312 L186,313 L185,313 L184,314 L177,314 L176,313 L174,313 L172,311 L171,311 L169,309 L169,308 L167,306 L167,302 L166,301 L166,300 L167,299 L167,296 L168,295 L168,294 L169,293 L169,292 L172,289 L173,289 L174,288 L176,288 Z M78,92 L80,103 L101,106 L101,215 L85,224 L30,329 L11,358 L13,367 L46,368 L58,350 L65,348 L99,349 L95,363 L101,368 L130,368 L137,362 L275,362 L278,354 L266,351 L268,302 L298,338 L339,363 L361,368 L377,367 L392,362 L404,352 L410,340 L410,323 L403,310 L389,300 L360,291 L345,280 L328,259 L291,200 L276,187 L258,180 L258,106 L280,104 L284,99 L282,90 L189,14 L181,10 L171,14 Z M65,337 L65,336 L66,335 L66,333 L67,332 L67,331 L69,329 L69,328 L70,327 L70,326 L71,325 L71,324 L72,323 L72,322 L73,321 L75,321 L76,320 L112,320 L114,322 L113,323 L113,325 L112,326 L112,327 L111,328 L111,329 L110,330 L110,332 L109,333 L109,334 L107,336 L107,337 L106,338 L66,338 Z M130,313 L131,314 L131,351 L129,353 L127,353 L125,355 L125,356 L123,358 L110,358 L109,357 L109,356 L110,355 L110,354 L111,353 L111,352 L112,351 L112,349 L113,348 L113,347 L114,346 L114,345 L115,344 L115,343 L116,342 L116,341 L117,340 L117,339 L118,338 L118,337 L119,336 L119,335 L120,334 L120,333 L121,332 L121,330 L122,329 L122,328 L124,326 L124,324 L125,323 L125,322 L126,321 L126,320 L127,319 L127,318 L128,317 L128,316 L129,315 L129,314 Z M79,309 L80,308 L80,306 L81,305 L81,304 L82,303 L82,302 L83,301 L83,300 L84,299 L84,298 L85,297 L85,296 L86,295 L86,294 L88,292 L126,292 L127,293 L127,294 L126,295 L126,297 L125,298 L125,299 L124,300 L124,301 L123,302 L123,303 L122,304 L122,305 L121,306 L121,307 L120,308 L120,309 L119,310 L80,310 Z M93,281 L93,280 L94,279 L94,278 L95,277 L95,276 L96,275 L96,274 L97,273 L97,272 L98,271 L98,270 L99,269 L99,268 L100,267 L100,266 L102,264 L137,264 L138,265 L139,264 L140,265 L140,266 L139,267 L139,268 L138,269 L138,271 L137,272 L137,273 L136,274 L136,275 L135,276 L135,277 L134,278 L134,279 L133,280 L133,281 L132,282 L94,282 Z M229,242 L231,244 L231,245 L235,250 L236,253 L240,258 L241,261 L243,263 L243,264 L247,269 L247,270 L248,271 L248,272 L250,274 L251,277 L256,283 L256,351 L255,352 L229,352 L228,351 L228,243 Z M170,227 L215,227 L218,229 L218,351 L217,352 L142,352 L141,351 L141,287 L156,257 L156,255 L161,246 L161,244 Z M111,253 L111,228 L112,227 L157,227 L158,228 L157,229 L157,230 L156,231 L156,232 L155,233 L155,234 L154,235 L154,237 L153,238 L153,239 L152,240 L152,241 L151,242 L151,243 L150,244 L150,245 L149,246 L149,248 L148,249 L148,250 L147,251 L147,252 L145,254 L112,254 Z M100,227 L101,228 L101,246 L99,250 L99,253 L97,254 L93,258 L78,289 L76,291 L43,357 L42,358 L30,358 L29,357 L26,357 L25,356 L28,353 L30,348 L32,346 L34,341 L36,339 L40,330 L42,328 L50,311 L52,309 L56,300 L58,298 L65,283 L67,281 L73,268 L75,266 L90,236 L92,234 L93,231 L97,227 Z M241,192 L248,190 L255,190 L264,192 L273,197 L288,213 L297,229 L305,240 L307,245 L330,279 L341,290 L360,302 L374,307 L382,308 L387,310 L397,319 L400,326 L400,337 L397,344 L390,351 L383,355 L378,356 L377,355 L378,352 L377,336 L375,332 L367,324 L358,320 L345,317 L332,311 L319,302 L306,289 L292,270 L251,205 L240,193 Z M192,195 L197,191 L209,190 L221,193 L233,201 L245,215 L295,292 L308,306 L327,320 L340,326 L353,329 L362,333 L365,336 L368,342 L368,349 L366,354 L362,358 L353,357 L343,354 L323,344 L310,335 L301,327 L290,315 L278,299 L231,226 L226,221 L218,217 L190,216 L189,215 L189,201 Z M192,137 L194,139 L195,139 L197,141 L198,141 L204,147 L204,148 L206,150 L206,151 L207,152 L207,154 L208,155 L208,157 L209,158 L209,179 L208,180 L200,180 L199,181 L196,181 L193,183 L191,183 L190,184 L189,184 L186,187 L185,187 L184,188 L184,189 L181,192 L181,193 L180,194 L180,196 L179,197 L179,209 L178,210 L178,215 L177,216 L173,216 L172,217 L171,216 L151,216 L150,215 L150,160 L151,159 L151,155 L152,154 L154,149 L161,141 L162,141 L165,138 L166,138 L167,137 L169,137 L170,136 L173,136 L174,135 L185,135 L186,136 L189,136 L190,137 Z M111,106 L112,105 L247,105 L248,106 L248,179 L231,186 L219,181 L219,156 L215,145 L209,137 L200,130 L190,126 L185,125 L169,126 L163,128 L150,137 L145,144 L141,154 L140,159 L140,215 L132,217 L113,217 L111,215 Z M91,94 L115,73 L120,70 L153,42 L180,21 L185,24 L201,38 L206,41 L216,50 L227,58 L238,68 L248,75 L270,94 L269,95 L92,95 Z";

const SD_ICON_PATH =
  "M287,153 L284,150 L272,150 L271,151 L264,151 L263,152 L258,152 L257,153 L254,153 L253,154 L251,154 L250,155 L247,155 L246,156 L244,156 L243,157 L242,157 L241,158 L239,158 L238,159 L237,159 L236,160 L235,160 L234,161 L232,161 L231,162 L230,162 L228,164 L227,164 L226,165 L225,165 L224,166 L223,166 L221,168 L220,168 L217,171 L217,172 L216,173 L216,174 L217,175 L217,176 L219,178 L221,178 L222,179 L223,178 L224,178 L225,177 L226,177 L228,175 L229,175 L230,174 L231,174 L233,172 L234,172 L235,171 L236,171 L237,170 L238,170 L239,169 L240,169 L241,168 L242,168 L243,167 L245,167 L246,166 L248,166 L249,165 L251,165 L252,164 L254,164 L255,163 L257,163 L258,162 L263,162 L264,161 L270,161 L271,160 L283,160 L284,159 L285,159 L286,158 L286,157 L287,156 Z M81,153 L81,157 L84,160 L96,160 L97,161 L103,161 L104,162 L108,162 L109,163 L112,163 L113,164 L116,164 L117,165 L119,165 L120,166 L122,166 L123,167 L124,167 L125,168 L126,168 L127,169 L128,169 L129,170 L131,170 L132,171 L133,171 L134,172 L135,172 L137,174 L138,174 L140,176 L141,176 L143,178 L144,178 L145,179 L147,179 L148,178 L149,178 L151,176 L151,171 L148,168 L147,168 L146,167 L145,167 L143,165 L142,165 L140,163 L139,163 L138,162 L137,162 L136,161 L134,161 L133,160 L132,160 L131,159 L129,159 L128,158 L127,158 L126,157 L125,157 L124,156 L122,156 L121,155 L119,155 L118,154 L115,154 L114,153 L110,153 L109,152 L105,152 L104,151 L98,151 L97,150 L84,150 Z M287,112 L286,111 L286,110 L284,108 L274,108 L273,109 L265,109 L264,110 L259,110 L258,111 L255,111 L254,112 L251,112 L250,113 L247,113 L246,114 L245,114 L244,115 L242,115 L241,116 L239,116 L238,117 L237,117 L236,118 L235,118 L234,119 L233,119 L232,120 L231,120 L230,121 L229,121 L228,122 L227,122 L226,123 L225,123 L223,125 L222,125 L220,127 L219,127 L217,129 L217,134 L219,136 L224,136 L225,135 L226,135 L228,133 L229,133 L230,132 L231,132 L233,130 L234,130 L235,129 L236,129 L237,128 L238,128 L239,127 L240,127 L241,126 L243,126 L244,125 L245,125 L246,124 L248,124 L249,123 L251,123 L252,122 L255,122 L256,121 L258,121 L259,120 L263,120 L264,119 L270,119 L271,118 L283,118 L284,117 L285,117 L286,116 L286,115 L287,114 Z M81,111 L81,115 L84,118 L95,118 L96,119 L104,119 L105,120 L108,120 L109,121 L112,121 L113,122 L116,122 L117,123 L119,123 L120,124 L122,124 L123,125 L125,125 L126,126 L127,126 L128,127 L129,127 L130,128 L131,128 L132,129 L133,129 L134,130 L135,130 L136,131 L137,131 L139,133 L140,133 L142,135 L143,135 L144,136 L145,136 L146,137 L147,137 L148,136 L149,136 L151,134 L151,129 L149,127 L148,127 L146,125 L145,125 L144,124 L143,124 L141,122 L140,122 L139,121 L138,121 L137,120 L136,120 L135,119 L134,119 L133,118 L132,118 L131,117 L130,117 L129,116 L127,116 L126,115 L125,115 L124,114 L122,114 L121,113 L118,113 L117,112 L115,112 L114,111 L110,111 L109,110 L103,110 L102,109 L96,109 L95,108 L84,108 Z M287,73 L286,72 L286,71 L285,70 L284,70 L283,69 L276,69 L275,70 L267,70 L266,71 L259,71 L258,72 L255,72 L254,73 L251,73 L250,74 L247,74 L246,75 L244,75 L243,76 L241,76 L240,77 L239,77 L238,78 L237,78 L236,79 L234,79 L233,80 L231,80 L230,81 L229,81 L228,82 L227,82 L226,83 L225,83 L223,85 L222,85 L220,87 L219,87 L217,89 L217,94 L218,95 L219,95 L220,96 L224,96 L225,95 L226,95 L227,94 L228,94 L230,92 L231,92 L232,91 L233,91 L234,90 L235,90 L236,89 L237,89 L238,88 L239,88 L240,87 L241,87 L242,86 L244,86 L245,85 L247,85 L248,84 L251,84 L252,83 L254,83 L255,82 L258,82 L259,81 L264,81 L265,80 L272,80 L273,79 L284,79 L286,77 L286,76 L287,75 Z M81,72 L81,77 L83,79 L92,79 L93,80 L101,80 L102,81 L107,81 L108,82 L112,82 L113,83 L116,83 L117,84 L119,84 L120,85 L122,85 L123,86 L125,86 L126,87 L127,87 L128,88 L130,88 L131,89 L132,89 L133,90 L134,90 L135,91 L136,91 L137,92 L138,92 L139,93 L140,93 L142,95 L143,95 L144,96 L149,96 L151,94 L151,89 L149,87 L148,87 L146,85 L145,85 L144,84 L143,84 L141,82 L140,82 L139,81 L137,81 L136,80 L135,80 L134,79 L132,79 L131,78 L130,78 L129,77 L127,77 L126,76 L124,76 L123,75 L121,75 L120,74 L118,74 L117,73 L113,73 L112,72 L108,72 L107,71 L102,71 L101,70 L90,70 L89,69 L85,69 L84,70 L83,70 Z M13,53 L11,58 L11,242 L19,254 L26,257 L123,259 L141,264 L174,284 L193,284 L210,275 L211,291 L215,296 L221,295 L232,287 L249,296 L253,293 L254,258 L342,257 L354,248 L357,239 L357,61 L354,53 L347,46 L325,43 L325,23 L317,11 L280,10 L243,16 L209,30 L183,49 L161,31 L131,18 L98,11 L54,10 L43,20 L43,42 L23,45 Z M242,232 L243,233 L243,281 L242,282 L240,280 L239,280 L237,278 L236,278 L234,276 L231,276 L230,277 L229,277 L228,278 L227,278 L225,280 L224,280 L223,281 L222,281 L221,280 L221,241 L223,239 L224,239 L225,238 L226,238 L227,237 L229,237 L230,236 L231,236 L232,235 L234,235 L235,234 L237,234 L238,233 L240,233 L241,232 Z M342,55 L345,58 L347,63 L347,226 L346,227 L346,241 L340,247 L254,248 L253,247 L253,230 L256,228 L262,228 L270,226 L315,226 L321,223 L325,215 L325,55 L326,54 Z M26,55 L43,55 L43,217 L45,221 L52,226 L96,226 L123,231 L155,244 L179,261 L189,261 L210,246 L211,261 L195,273 L180,275 L169,271 L150,257 L123,249 L98,247 L32,248 L26,246 L22,242 L21,61 Z M313,21 L315,24 L314,214 L312,216 L273,216 L242,221 L224,227 L210,234 L190,248 L189,247 L189,60 L195,53 L212,40 L227,32 L241,27 L257,23 L282,20 Z M55,21 L85,20 L123,26 L138,31 L156,40 L172,52 L179,61 L178,248 L159,235 L143,227 L124,221 L94,216 L55,216 L53,214 L53,23 Z";

const SMP_ICON_PATH =
  "M259,349 L258,350 L257,350 L256,351 L256,360 L257,361 L258,361 L259,362 L262,362 L263,361 L264,361 L265,360 L265,357 L266,356 L266,354 L265,353 L265,351 L263,349 Z M220,349 L217,352 L217,359 L220,362 L224,362 L225,361 L226,361 L227,360 L227,351 L226,350 L225,350 L224,349 Z M354,330 L352,332 L351,332 L347,336 L347,337 L346,338 L346,339 L345,340 L345,342 L344,343 L344,358 L343,359 L343,373 L344,374 L344,375 L345,376 L346,376 L347,377 L377,377 L378,376 L379,376 L380,375 L380,374 L381,373 L381,349 L380,348 L380,343 L379,342 L379,341 L378,340 L378,339 L377,338 L377,337 L376,336 L376,335 L373,332 L372,332 L371,331 L370,331 L369,330 L368,330 L367,329 L357,329 L356,330 Z M359,339 L365,339 L369,343 L369,344 L370,345 L370,366 L369,367 L355,367 L354,366 L354,365 L353,364 L353,348 L354,347 L354,345 L355,344 L355,343 Z M112,331 L105,338 L105,340 L104,341 L104,343 L103,344 L103,374 L106,377 L137,377 L140,374 L140,345 L139,344 L139,341 L138,340 L138,339 L137,338 L137,337 L131,331 L130,331 L129,330 L128,330 L127,329 L117,329 L116,330 L114,330 L113,331 Z M121,338 L123,338 L124,339 L125,339 L128,342 L128,343 L129,344 L129,346 L130,347 L130,366 L129,367 L114,367 L113,366 L113,346 L114,345 L114,344 L119,339 L120,339 Z M352,272 L347,277 L347,278 L345,280 L345,282 L344,283 L344,291 L343,292 L343,310 L344,311 L344,312 L346,314 L378,314 L380,312 L380,284 L379,283 L379,281 L378,280 L378,279 L376,277 L376,276 L372,272 L371,272 L370,271 L369,271 L368,270 L364,270 L363,269 L361,269 L360,270 L356,270 L355,271 L354,271 L353,272 Z M361,279 L363,279 L364,280 L365,280 L369,284 L369,285 L370,286 L370,303 L369,304 L354,304 L353,303 L353,288 L354,287 L354,285 L355,284 L355,283 L357,281 L358,281 L359,280 L360,280 Z M111,272 L106,277 L106,278 L105,279 L105,280 L104,281 L104,283 L103,284 L103,311 L104,312 L104,313 L105,314 L128,314 L129,315 L130,315 L131,314 L137,314 L138,313 L139,313 L139,312 L140,311 L140,285 L139,284 L139,282 L138,281 L138,280 L137,279 L137,278 L135,276 L135,275 L134,274 L133,274 L130,271 L128,271 L127,270 L124,270 L123,269 L119,269 L118,270 L115,270 L114,271 L113,271 L112,272 Z M120,279 L123,279 L124,280 L125,280 L129,284 L129,286 L130,287 L130,303 L129,304 L114,304 L113,303 L113,286 L114,285 L114,284 L118,280 L119,280 Z M266,219 L265,220 L264,220 L261,223 L260,223 L258,225 L258,226 L256,228 L256,229 L255,230 L255,231 L254,232 L254,235 L253,236 L253,270 L256,273 L290,273 L292,271 L292,270 L293,269 L293,237 L292,236 L292,232 L291,231 L291,230 L290,229 L290,228 L283,221 L282,221 L281,220 L280,220 L279,219 L277,219 L276,218 L270,218 L269,219 Z M263,252 L264,251 L281,251 L283,253 L282,254 L282,262 L281,263 L276,263 L275,264 L268,264 L267,263 L264,263 L263,262 Z M264,234 L269,229 L270,229 L271,228 L274,228 L275,229 L276,229 L277,230 L278,230 L280,232 L280,233 L282,235 L282,241 L281,242 L264,242 L263,241 L263,238 L264,237 Z M203,219 L202,220 L201,220 L198,223 L197,223 L195,225 L195,226 L193,228 L193,229 L192,230 L192,231 L191,232 L191,235 L190,236 L190,269 L191,270 L191,271 L193,273 L227,273 L230,270 L230,236 L229,235 L229,232 L228,231 L228,230 L227,229 L227,228 L226,227 L226,226 L223,223 L222,223 L220,221 L219,221 L218,220 L217,220 L216,219 L214,219 L213,218 L207,218 L206,219 Z M200,252 L201,251 L219,251 L220,252 L220,262 L219,263 L214,263 L213,264 L209,264 L208,263 L201,263 L200,262 Z M200,236 L201,235 L201,234 L203,232 L203,231 L204,230 L205,230 L206,229 L207,229 L208,228 L212,228 L213,229 L214,229 L218,233 L218,234 L219,235 L219,239 L220,240 L219,241 L216,241 L215,242 L202,242 L200,240 Z M239,162 L237,164 L237,180 L242,185 L243,185 L246,188 L247,188 L248,189 L252,189 L254,187 L254,182 L253,181 L252,181 L247,176 L247,175 L246,174 L246,164 L245,163 L244,163 L243,162 Z M235,144 L234,145 L232,145 L231,146 L229,146 L228,147 L226,147 L224,149 L221,150 L218,153 L217,153 L217,154 L214,157 L214,158 L212,160 L212,161 L211,162 L211,163 L209,166 L209,168 L208,169 L208,173 L207,174 L207,180 L208,181 L208,185 L209,186 L209,189 L210,190 L210,191 L211,192 L211,193 L212,194 L213,197 L217,201 L217,202 L219,204 L220,204 L223,207 L224,207 L227,209 L229,209 L232,211 L235,211 L236,212 L247,212 L248,211 L251,211 L252,210 L254,210 L255,209 L256,209 L257,208 L260,207 L262,205 L263,205 L268,200 L268,199 L271,196 L272,193 L274,191 L274,189 L275,188 L275,185 L276,184 L276,171 L275,170 L275,167 L274,166 L274,165 L273,164 L273,163 L272,162 L271,159 L261,149 L260,149 L259,148 L258,148 L255,146 L253,146 L252,145 L249,145 L248,144 Z M233,155 L235,155 L236,154 L246,154 L247,155 L249,155 L250,156 L252,156 L253,157 L254,157 L256,159 L257,159 L259,161 L259,162 L263,166 L263,167 L264,168 L264,169 L265,170 L265,173 L266,174 L266,180 L265,181 L265,185 L264,186 L264,187 L263,188 L263,189 L262,190 L262,191 L261,192 L261,193 L258,196 L257,196 L254,199 L253,199 L252,200 L250,200 L249,201 L246,201 L245,202 L238,202 L237,201 L234,201 L233,200 L232,200 L231,199 L230,199 L228,197 L227,197 L222,192 L222,191 L221,190 L221,189 L220,188 L220,187 L219,186 L219,185 L218,184 L218,180 L217,179 L217,176 L218,175 L218,171 L219,170 L219,169 L220,168 L220,167 L221,166 L221,165 L229,157 L230,157 L231,156 L232,156 Z M240,10 L236,14 L236,96 L141,168 L143,177 L157,179 L156,196 L92,197 L60,237 L63,245 L76,247 L76,404 L45,404 L45,384 L65,369 L69,342 L54,307 L39,298 L23,310 L10,344 L14,368 L35,384 L34,404 L15,405 L12,413 L470,415 L471,406 L449,404 L449,384 L467,373 L474,357 L468,322 L449,299 L440,299 L429,308 L414,347 L419,369 L439,383 L439,404 L408,404 L407,256 L408,247 L421,245 L423,236 L392,197 L326,195 L326,179 L340,177 L342,168 L247,96 L247,60 L301,65 L304,30 Z M443,309 L446,309 L452,315 L452,316 L454,318 L454,319 L455,320 L455,321 L456,322 L456,323 L457,324 L457,325 L459,328 L459,330 L460,331 L460,333 L461,334 L461,335 L462,336 L462,338 L463,339 L463,343 L464,344 L464,356 L463,357 L463,359 L462,360 L462,361 L461,362 L460,365 L455,370 L454,370 L451,372 L449,369 L449,344 L447,342 L444,341 L443,342 L442,342 L439,345 L439,371 L438,372 L437,371 L434,370 L429,365 L429,364 L427,362 L427,361 L426,360 L426,358 L425,357 L425,343 L426,342 L426,339 L427,338 L427,336 L428,335 L428,333 L429,332 L429,330 L431,327 L431,325 L432,324 L433,321 L435,319 L435,318 L437,316 L437,315 Z M38,309 L41,309 L47,315 L47,316 L49,318 L49,319 L50,320 L50,321 L52,323 L52,325 L53,326 L53,327 L55,330 L55,332 L56,333 L56,335 L57,336 L57,338 L58,339 L58,343 L59,344 L59,356 L58,357 L58,359 L57,360 L57,362 L55,364 L55,365 L49,371 L47,371 L46,372 L45,371 L45,368 L44,367 L44,361 L45,360 L45,347 L44,346 L44,344 L42,342 L37,342 L35,344 L35,361 L34,362 L34,371 L33,372 L32,371 L29,370 L24,365 L24,364 L22,362 L22,360 L21,359 L21,357 L20,356 L20,345 L21,344 L21,340 L22,339 L22,336 L23,335 L23,333 L24,332 L24,330 L25,329 L25,328 L26,327 L26,326 L27,325 L27,324 L28,323 L28,322 L29,321 L30,318 L32,316 L32,315 Z M248,303 L249,303 L250,304 L254,304 L255,305 L257,305 L258,306 L261,307 L263,309 L264,309 L272,317 L272,318 L274,320 L274,322 L276,325 L276,328 L277,329 L277,404 L276,405 L248,405 L247,404 L247,304 Z M235,303 L236,304 L236,329 L237,330 L237,335 L236,336 L236,391 L237,392 L237,400 L236,401 L236,404 L235,405 L207,405 L206,404 L206,330 L207,329 L207,325 L208,324 L208,322 L209,321 L209,320 L211,318 L211,317 L219,309 L220,309 L222,307 L223,307 L226,305 L228,305 L229,304 L233,304 L234,303 Z M327,246 L396,246 L397,247 L397,348 L398,349 L398,353 L397,354 L397,404 L396,405 L327,405 L326,404 L326,247 Z M87,246 L156,246 L157,247 L157,404 L156,405 L87,405 L86,404 L86,247 Z M326,207 L327,206 L386,206 L392,212 L392,213 L394,215 L394,216 L397,219 L397,220 L401,224 L401,225 L404,228 L404,229 L406,231 L406,232 L409,235 L408,236 L327,236 L326,235 Z M75,234 L78,231 L78,230 L80,228 L80,227 L84,223 L84,222 L86,220 L86,219 L91,214 L91,213 L95,209 L95,208 L97,206 L156,206 L157,207 L157,235 L156,236 L76,236 L75,235 Z M240,106 L262,120 L323,167 L316,171 L315,405 L287,404 L287,328 L285,319 L271,301 L260,295 L247,292 L223,295 L212,301 L204,309 L196,329 L196,404 L168,404 L167,171 L160,167 Z M247,27 L248,26 L252,26 L253,27 L255,27 L256,28 L258,28 L259,29 L260,29 L261,30 L263,30 L264,31 L265,31 L266,32 L268,32 L269,33 L272,33 L273,34 L277,34 L278,35 L284,35 L285,36 L293,36 L294,37 L294,54 L293,55 L285,55 L284,54 L280,54 L279,53 L276,53 L275,52 L272,52 L271,51 L268,51 L267,50 L262,50 L261,49 L248,49 L247,48 Z";

const SMA_ICON_PATH =
  "M364,300 L363,301 L362,301 L361,302 L360,302 L358,304 L357,304 L351,310 L351,311 L349,313 L349,315 L348,316 L348,317 L347,318 L347,320 L346,321 L346,355 L347,356 L347,357 L348,357 L349,358 L350,358 L351,359 L379,359 L380,358 L381,358 L383,356 L383,355 L384,354 L384,324 L383,323 L383,319 L382,318 L382,316 L381,315 L381,314 L380,313 L380,312 L378,310 L378,309 L373,304 L372,304 L371,303 L370,303 L368,301 L367,301 L366,300 Z M364,312 L366,312 L371,317 L371,318 L372,319 L372,320 L373,321 L373,323 L374,324 L374,334 L373,335 L373,336 L374,337 L374,343 L373,344 L373,348 L372,349 L357,349 L356,348 L356,323 L357,322 L357,319 L359,317 L359,316 L362,313 L363,313 Z M72,300 L71,301 L69,301 L67,303 L66,303 L64,305 L63,305 L59,309 L59,310 L57,312 L57,313 L56,314 L56,315 L55,316 L55,318 L54,319 L54,356 L56,358 L57,358 L58,359 L88,359 L89,358 L90,358 L91,357 L91,356 L92,355 L92,325 L91,324 L91,319 L90,318 L90,316 L89,315 L89,314 L88,313 L88,312 L87,311 L87,310 L83,306 L82,306 L79,303 L78,303 L76,301 L75,301 L74,300 Z M72,311 L73,311 L79,317 L79,318 L80,319 L80,320 L81,321 L81,335 L82,336 L82,344 L81,345 L81,348 L80,349 L65,349 L64,348 L64,322 L65,321 L65,319 L66,318 L66,317 Z M203,15 L190,30 L188,48 L195,64 L214,76 L214,89 L154,134 L134,160 L130,188 L137,209 L129,226 L123,229 L123,234 L129,238 L129,271 L114,272 L105,249 L78,225 L77,216 L71,214 L67,226 L40,249 L31,271 L22,275 L22,280 L28,284 L28,375 L13,377 L11,384 L42,387 L425,386 L425,377 L410,375 L410,283 L416,276 L406,271 L398,250 L371,226 L366,214 L361,216 L360,225 L332,250 L324,271 L309,271 L309,238 L316,234 L316,229 L309,226 L301,209 L308,192 L305,161 L298,148 L280,130 L225,90 L224,77 L244,66 L251,50 L248,47 L233,49 L222,43 L218,35 L224,18 L222,11 Z M219,301 L220,301 L223,304 L224,304 L227,307 L228,307 L235,314 L235,315 L236,316 L236,317 L238,320 L238,323 L239,324 L239,375 L237,377 L212,377 L211,376 L201,376 L200,375 L200,322 L201,321 L201,319 L202,318 L202,317 L203,316 L203,315 L212,306 L213,306 L216,303 L217,303 Z M118,283 L128,283 L129,284 L129,375 L128,376 L118,376 L117,375 L117,298 L118,297 L118,285 L117,284 Z M331,283 L338,283 L339,282 L351,282 L352,283 L356,283 L357,282 L398,282 L400,284 L399,285 L399,288 L400,289 L400,303 L399,304 L399,338 L400,339 L399,340 L400,341 L400,364 L399,365 L400,366 L399,367 L399,376 L398,377 L372,377 L371,376 L331,376 L330,375 L330,284 Z M312,282 L317,282 L320,284 L320,375 L319,376 L316,376 L315,377 L311,377 L309,375 L309,284 Z M39,283 L47,283 L48,282 L96,282 L97,283 L99,283 L100,282 L106,282 L107,283 L107,338 L108,339 L108,341 L107,342 L107,375 L106,376 L96,376 L95,377 L62,377 L61,376 L39,376 L38,375 L38,284 Z M219,265 L243,284 L251,289 L259,297 L262,305 L262,375 L258,377 L254,377 L249,375 L249,323 L247,315 L244,309 L239,303 L222,290 L217,290 L198,305 L192,314 L190,319 L190,375 L188,377 L178,377 L176,375 L176,307 L177,303 L180,297 L189,288 L201,280 Z M139,238 L298,237 L299,375 L282,377 L273,375 L273,308 L269,294 L260,283 L219,252 L181,281 L174,288 L168,298 L166,306 L166,375 L157,377 L140,376 Z M334,271 L335,270 L335,266 L336,265 L336,263 L337,262 L337,261 L338,260 L338,259 L341,256 L341,255 L345,251 L346,251 L351,246 L352,246 L356,242 L357,242 L361,238 L362,238 L365,235 L368,238 L369,238 L374,243 L375,243 L378,246 L379,246 L391,258 L391,259 L392,260 L392,261 L393,262 L393,263 L394,264 L394,266 L395,267 L395,270 L396,271 L395,272 L383,272 L382,273 L380,273 L379,272 L335,272 Z M42,268 L43,267 L43,265 L44,264 L44,262 L45,261 L45,260 L46,259 L46,258 L56,248 L57,248 L62,243 L63,243 L67,239 L68,239 L72,235 L73,235 L78,240 L79,240 L82,243 L83,243 L88,248 L89,248 L98,257 L98,258 L100,260 L100,261 L101,262 L101,263 L102,264 L102,267 L103,268 L103,271 L102,272 L43,272 L42,271 Z M139,224 L141,221 L141,219 L145,215 L147,214 L290,214 L291,215 L293,215 L297,219 L299,223 L299,226 L298,227 L140,227 L139,226 Z M141,171 L147,157 L159,143 L183,125 L186,124 L189,121 L209,108 L218,100 L220,100 L228,107 L271,136 L287,151 L292,158 L297,169 L297,172 L298,173 L298,190 L295,199 L291,204 L213,204 L212,205 L208,205 L207,204 L175,204 L174,205 L167,205 L166,204 L147,204 L143,198 L141,192 L141,188 L140,187 Z M207,25 L208,26 L208,38 L209,39 L209,41 L210,42 L210,43 L211,44 L211,45 L213,47 L213,48 L218,53 L219,53 L221,55 L222,55 L223,56 L224,56 L225,57 L226,57 L227,58 L231,58 L232,59 L234,59 L235,60 L233,62 L232,62 L231,63 L230,63 L229,64 L227,64 L226,65 L221,65 L220,66 L218,66 L217,65 L214,65 L213,64 L212,64 L211,63 L210,63 L209,62 L208,62 L202,56 L202,55 L201,54 L201,53 L200,52 L200,51 L199,50 L199,44 L198,43 L198,41 L199,40 L199,36 L200,35 L200,34 L201,33 L201,32 L202,31 L202,30 Z";

// Playhouse with a peaked roof, an arched window + door, a slide, and a
// low fence — matches the PG-TK tab's icon. Exported so ContactSection
// can reuse the exact same icon for its "PG-TK-SD" card, per instruction.
export function PgtkIcon() {
  return (
    <svg viewBox="0 0 422 378" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d={PGTK_ICON_PATH} />
    </svg>
  );
}

// Open book with fanned pages, short lines of "text," and a bookmark
// ribbon — matches the SD tab's icon. Exported so it can be reused
// elsewhere (e.g. the Jenjang page) per instruction.
export function SdIcon() {
  return (
    <svg viewBox="0 0 368 306" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d={SD_ICON_PATH} />
    </svg>
  );
}

// School building with a flagpole, a round clock, arched windows, and
// flanking trees — matches the SMP tab's icon. Exported so ContactSection
// can reuse the exact same icon for its "SMP-SMA" card, per instruction.
export function SmpIcon() {
  return (
    <svg viewBox="0 0 486 425" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d={SMP_ICON_PATH} />
    </svg>
  );
}

// Mosque with a crescent finial, an onion dome, and twin minarets —
// matches the SMA tab's icon. Exported so it can be reused elsewhere
// (e.g. the Jenjang page) per instruction.
export function SmaIcon() {
  return (
    <svg viewBox="0 0 439 397" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d={SMA_ICON_PATH} />
    </svg>
  );
}

// Description/caption/FAQ copy is placeholder text (matching the PG-TK
// copy from the mockup in tone) for SD/SMP/SMA, since only PG-TK's real
// copy was given — swap in the real copy when it's ready.
const JENJANG = [
  {
    name: "PG-TK",
    subtitle: "Playgroup – TK",
    icon: PgtkIcon,
    photo: "/images/about/faq-pgtk.jpg",
    description:
      "Tahap awal pendidikan yang menyenangkan untuk menumbuhkan iman, akhlak, dan kemandirian sejak dini.",
    caption:
      "Lingkungan belajar yang aman, nyaman, dan penuh kasih sayang untuk tumbuh kembang optimal.",
    faqs: [
      {
        q: "Berapa usia minimal untuk masuk PG-TK Attaufiq?",
        a: "Usia minimal untuk Playgroup adalah 2 tahun, dan untuk TK adalah 4 tahun, mengikuti kesiapan tumbuh kembang anak.",
      },
      {
        q: "Apakah ada proses seleksi untuk PG-TK?",
        a: "Tidak ada tes akademik; pendaftaran PG-TK berupa observasi kesiapan dan wawancara singkat dengan orang tua.",
      },
      {
        q: "Bagaimana kurikulum yang digunakan di PG-TK Attaufiq?",
        a: "Kurikulum memadukan Kurikulum Merdeka dengan nilai-nilai Al-Qur'an dan Sunnah melalui pembelajaran berbasis bermain.",
      },
      {
        q: "Apakah anak harus sudah bisa membaca atau menulis?",
        a: "Tidak. PG-TK justru menjadi tempat menumbuhkan kesiapan membaca dan menulis secara bertahap dan menyenangkan.",
      },
      {
        q: "Bagaimana jam belajar dan jam pulang di PG-TK?",
        a: "Kegiatan belajar berlangsung pukul 07.30–11.00 WIB, dengan opsi program tambahan hingga siang hari.",
      },
      {
        q: "Apakah ada program Tahfizh di PG-TK?",
        a: "Ada, dalam bentuk pengenalan hafalan surat-surat pendek dan doa harian yang disesuaikan dengan usia anak.",
      },
      {
        q: "Bagaimana fasilitas yang tersedia untuk PG-TK?",
        a: "Ruang kelas ramah anak, area bermain indoor dan outdoor, serta perlengkapan belajar yang aman dan edukatif.",
      },
      {
        q: "Bagaimana komunikasi antara sekolah dan orang tua?",
        a: "Melalui laporan perkembangan berkala, grup komunikasi kelas, dan pertemuan orang tua-guru secara rutin.",
      },
    ],
  },
  {
    name: "SD",
    subtitle: "Sekolah Dasar",
    icon: SdIcon,
    photo: "/images/about/faq-sd.jpg",
    description:
      "Membangun fondasi akademik dan karakter Islami yang kuat melalui pembelajaran yang aktif, kreatif, dan menyenangkan.",
    caption:
      "Kurikulum tahfizh dan akademik yang seimbang untuk tumbuh kembang anak yang optimal.",
    faqs: [
      {
        q: "Berapa usia minimal untuk masuk SD Attaufiq?",
        a: "Usia minimal calon siswa SD adalah 6 tahun pada saat tahun ajaran baru dimulai.",
      },
      {
        q: "Apakah ada tes masuk untuk calon siswa SD?",
        a: "Ada, berupa asesmen kesiapan belajar dan wawancara singkat, bukan tes akademik yang memberatkan.",
      },
      {
        q: "Bagaimana kurikulum yang digunakan di SD Attaufiq?",
        a: "Kurikulum Merdeka dipadukan dengan program tahfizh dan penguatan karakter Islami setiap harinya.",
      },
      {
        q: "Apakah ada program tahfizh Al-Qur'an di jenjang SD?",
        a: "Ada, dengan target hafalan bertahap sesuai kelas, didampingi guru tahfizh khusus.",
      },
      {
        q: "Bagaimana jam belajar dan jam pulang di SD?",
        a: "Kegiatan belajar berlangsung pukul 07.00–15.00 WIB, termasuk waktu untuk sholat berjamaah dan istirahat.",
      },
      {
        q: "Apakah tersedia kelas tambahan atau ekstrakurikuler?",
        a: "Tersedia berbagai ekstrakurikuler seperti olahraga, seni, dan sains untuk mengembangkan minat siswa.",
      },
      {
        q: "Bagaimana fasilitas yang tersedia untuk siswa SD?",
        a: "Ruang kelas ber-AC, perpustakaan, laboratorium sederhana, dan lapangan olahraga.",
      },
      {
        q: "Bagaimana komunikasi antara sekolah dan orang tua?",
        a: "Melalui rapor digital, grup komunikasi kelas, dan pertemuan orang tua-guru setiap semester.",
      },
    ],
  },
  {
    name: "SMP",
    subtitle: "Sekolah Menengah Pertama",
    icon: SmpIcon,
    photo: "/images/about/faq-smp.jpg",
    description:
      "Membentuk kemandirian, kedisiplinan, dan kepemimpinan siswa melalui pembelajaran berbasis karakter dan kecakapan hidup.",
    caption:
      "Lingkungan yang membentuk kepribadian tangguh, mandiri, dan berakhlak mulia.",
    faqs: [
      {
        q: "Apa saja syarat pendaftaran untuk SMP Attaufiq?",
        a: "Fotokopi ijazah/SKL SD, akta kelahiran, kartu keluarga, dan mengikuti tes seleksi masuk.",
      },
      {
        q: "Apakah ada tes masuk untuk calon siswa SMP?",
        a: "Ada, meliputi tes akademik dasar, baca tulis Al-Qur'an, dan wawancara.",
      },
      {
        q: "Bagaimana kurikulum yang digunakan di SMP Attaufiq?",
        a: "Kurikulum Merdeka dipadukan dengan program tahfizh dan pembinaan karakter berbasis boarding maupun reguler.",
      },
      {
        q: "Berapa target hafalan Al-Qur'an di jenjang SMP?",
        a: "Target hafalan disesuaikan dengan program yang dipilih, dengan capaian rata-rata beberapa juz selama tiga tahun.",
      },
      {
        q: "Bagaimana jam belajar dan jam pulang di SMP?",
        a: "Kegiatan belajar berlangsung pukul 07.00–15.30 WIB, dengan opsi program boarding bagi yang berminat.",
      },
      {
        q: "Ekstrakurikuler apa saja yang tersedia di SMP?",
        a: "Tersedia pramuka, olahraga, seni bela diri, karya ilmiah remaja, dan berbagai klub minat lainnya.",
      },
      {
        q: "Bagaimana fasilitas yang tersedia untuk siswa SMP?",
        a: "Laboratorium IPA dan komputer, perpustakaan, masjid, serta asrama bagi siswa boarding.",
      },
      {
        q: "Bagaimana sekolah membina kedisiplinan siswa?",
        a: "Melalui tata tertib yang konsisten, pembiasaan ibadah harian, dan pendampingan wali kelas secara personal.",
      },
    ],
  },
  {
    name: "SMA",
    subtitle: "Sekolah Menengah Atas",
    icon: SmaIcon,
    photo: "/images/about/faq-sma.jpg",
    description:
      "Mempersiapkan generasi unggul yang siap bersaing secara global dengan bekal keimanan, ilmu, dan keterampilan masa depan.",
    caption:
      "Pembinaan akademik dan karakter untuk mempersiapkan masa depan terbaik setiap siswa.",
    faqs: [
      {
        q: "Apa saja syarat pendaftaran untuk SMA Attaufiq?",
        a: "Fotokopi ijazah/SKL SMP, akta kelahiran, kartu keluarga, dan mengikuti tes seleksi masuk.",
      },
      {
        q: "Apakah ada tes masuk untuk calon siswa SMA?",
        a: "Ada, meliputi tes akademik, baca tulis Al-Qur'an, dan wawancara minat-bakat.",
      },
      {
        q: "Bagaimana kurikulum yang digunakan di SMA Attaufiq?",
        a: "Kurikulum Merdeka dengan peminatan yang dipadukan program tahfizh dan pembinaan karakter kepemimpinan.",
      },
      {
        q: "Apakah ada program persiapan masuk perguruan tinggi?",
        a: "Ada, berupa bimbingan belajar intensif, try out, dan konsultasi jurusan bagi siswa kelas akhir.",
      },
      {
        q: "Bagaimana jam belajar dan jam pulang di SMA?",
        a: "Kegiatan belajar berlangsung pukul 07.00–15.30 WIB, dengan opsi program boarding bagi yang berminat.",
      },
      {
        q: "Ekstrakurikuler apa saja yang tersedia di SMA?",
        a: "Tersedia OSIS, pramuka, olahraga, seni, karya ilmiah remaja, dan berbagai klub minat lainnya.",
      },
      {
        q: "Bagaimana fasilitas yang tersedia untuk siswa SMA?",
        a: "Laboratorium IPA dan komputer, perpustakaan, masjid, serta asrama bagi siswa boarding.",
      },
      {
        q: "Bagaimana sekolah membina kepemimpinan siswa?",
        a: "Melalui program OSIS, kepanitiaan acara, dan pelatihan kepemimpinan yang rutin diadakan.",
      },
    ],
  },
];

// Box B starts this far below Box A's own top edge (so Box A's rounded
// top corner peeks out above it) — pulled up 2cm from the previous
// calc(1rem + 2cm) so the white box sits higher. Box A spans a 3-row
// grid (top peek / Box B's own row / footer), so its total height
// auto-follows Box B's content height AND the footer's own content
// height — the footer row is no longer a fixed placeholder height, it's
// "auto" now that real footer content lives there, so Box A's cream
// bottom is trimmed to exactly the footer's height instead of an
// arbitrary reserved strip.
const BOX_B_TOP = "1rem";

// The active tab is larger, sits higher, navy-filled with a heavier gold
// outline, and shows a small sun mark above its icon; inactive tabs are
// smaller, ivory-filled, thin gold outline, muted-bronze icon/text. Same
// badge geometry for all four, just re-colored/re-scaled. Icon + name +
// subtitle are an HTML overlay on top of the arch SVG (not SVG <text>),
// positioned to clear the arch's curved peak.
export function JenjangTabShape({ active, Icon, name, subtitle }) {
  return (
    <div
      className={
        active
          ? "relative h-32 w-28 shrink-0 drop-shadow-[0_10px_18px_rgba(16,35,128,0.35)] sm:h-36 sm:w-32"
          : "relative h-24 w-20 shrink-0 drop-shadow-[0_6px_10px_rgba(16,35,128,0.2)] sm:h-28 sm:w-24"
      }
    >
      <svg viewBox="0 0 245 299" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={ARCH_PATH} fill={active ? "#102380" : "#FBF6EA"} />
        <path
          d={ARCH_PATH}
          fill="none"
          stroke="#FDD000"
          strokeWidth={active ? 5 : 3}
          transform="translate(122.5,149.5) scale(0.93) translate(-122.5,-149.5)"
        />
      </svg>

      <div className="relative flex h-full flex-col items-center px-1.5 pt-[24%] text-center">
        {active && (
          <Sun aria-hidden="true" className="mb-1 h-3 w-3 shrink-0 text-gold sm:h-3.5 sm:w-3.5" />
        )}
        <div
          className={active ? "h-7 w-7 sm:h-8 sm:w-8" : "h-5 w-5 sm:h-6 sm:w-6"}
          style={{ color: active ? "#ffffff" : "#8B7048" }}
        >
          <Icon />
        </div>
        <span
          className={`font-heading mt-1.5 font-bold leading-none ${
            active ? "text-xs text-white sm:text-sm" : "text-[0.65rem] text-navy sm:text-xs"
          }`}
        >
          {name}
        </span>
        <span
          className={`mt-1 text-[0.55rem] leading-tight sm:text-[0.6rem] ${
            active ? "text-white/70" : "text-navy/50"
          }`}
        >
          ({subtitle})
        </span>
      </div>
    </div>
  );
}

// "Pertanyaan yang Sering Diajukan" — per the "4. ABOUT US FAQ" mockup.
//
// Box A ("portrait") — narrower than Box B, and taller than it: it's the
// SAME box the footer lives in, not a separate one. Box A's own height
// auto-follows Box B's content (via the 3-row grid) instead of a
// hardcoded number, so it never falls short as the FAQ list grows.
//
// Box B ("landscape") — wider than Box A, sits on top: left column is
// the jenjang title/description as plain text above a SQUARE photo (not
// a full-bleed background) with the navy caption card overlapping its
// bottom edge; right column is the FAQ accordion list. Clicking a tab
// swaps all of it via the shared `active` index.
export default function FaqSection() {
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const jenjang = JENJANG[active];

  return (
    <section id="faq" className="relative scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/about/faq-bg.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="relative bg-navy/80 pb-20 pt-16 md:pb-24 md:pt-20">
        <Reveal className="mx-auto max-w-6xl px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">FAQ</span>
          <h2 className="font-heading mt-3 text-3xl text-white sm:text-4xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
            Temukan jawaban atas pertanyaan Bunda/Ayah tentang Attaufiq
            sesuai jenjang pendidikan yang diminati.
          </p>
          <div className="mx-auto mt-5 flex max-w-[220px] items-center gap-3">
            <span className="h-px flex-1 bg-gold/50" />
            <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
            <span className="h-px flex-1 bg-gold/50" />
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-6xl px-6">
          {/* Jenjang tab selector — bottoms align (items-end) so the
              active tab's extra height makes it read as taller/raised
              while all four still meet the panel's top edge. Clicking a
              tab moves the active styling and swaps Box B's placeholder. */}
          <div className="relative z-20 flex items-end justify-center gap-3 sm:gap-4">
            {JENJANG.map((j, i) => (
              <Reveal key={j.name} delay={i * 0.08}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setOpenFaq(null);
                  }}
                  aria-pressed={active === i}
                  className="cursor-pointer"
                >
                  <JenjangTabShape
                    active={active === i}
                    Icon={j.icon}
                    name={j.name}
                    subtitle={j.subtitle}
                  />
                </button>
              </Reveal>
            ))}
          </div>

          {/* Box A is pulled up under the tabs; Box B starts lower than
              Box A (not at the same top edge) by BOX_B_TOP, so Box A's
              own rounded top corner peeks out above Box B. Row 2's
              minmax(600px, auto) is the fixed floor: measured live with
              every single FAQ item open, one at a time, across all 4
              jenjang — the tallest case (a 2-line answer) came to
              593.5px, so 600px covers all of them with a small buffer.
              That means opening/closing any accordion item no longer
              resizes the whole white box at all (every state hits the
              same floor); it would only grow past 600px for a answer
              longer than any current one. */}
          {/* Reveal wraps the grid from the outside (not swapped in for
              it) so its own inline gridTemplateRows sizing math is
              untouched. */}
          <Reveal delay={0.1}>
          <div
            className="relative -mt-6 grid grid-cols-1 sm:-mt-7"
            style={{ gridTemplateRows: `${BOX_B_TOP} minmax(600px, auto) auto` }}
          >
            {/* Box A — portrait: narrower (centered, 88% width) than Box
                B, spans all 3 rows so its total height auto-follows Box
                B's own content height (row 2) plus the top peek (row 1)
                and the footer strip (row 3). */}
            <div
              className="relative z-0 col-start-1 row-span-3 row-start-1 mx-auto w-[88%] overflow-hidden rounded-[2rem] shadow-xl"
              style={{ backgroundColor: "#FAF8F4" }}
            />

            {/* Small sun mark centered on the seam where Box A's peek
                meets Box B's top edge. */}
            <Sun
              aria-hidden="true"
              className="relative z-20 col-start-1 row-start-1 mx-auto h-4 w-4 self-end text-gold"
            />

            {/* Box B — landscape: full width (wider than Box A), sits in
                row 2 only, so its own content height determines row 2's
                height (and therefore Box A's total height too). */}
            <div className="relative z-10 col-start-1 row-start-2 grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl sm:grid-cols-[24rem_1fr]">
              {/* Left — title/subtitle, divider, description as plain
                  text, then a photo that GROWS (flex-1) to fill the rest
                  of the column's height — which now matches the right
                  column's fixed height — instead of stopping at a small
                  square, so its bottom edge lines up with the bottom of
                  the FAQ list. The navy caption card overlaps its bottom
                  edge. Column track sized to this content (not an even
                  50/50 split), so the description is capped to the
                  photo's own width (max-w-xs) rather than stretching
                  wider than the photo. */}
              <div className="flex flex-col p-6 sm:p-8">
                <h3 className="font-heading text-2xl text-navy">
                  {jenjang.name}{" "}
                  <span className="text-base font-normal text-navy/50">
                    ({jenjang.subtitle})
                  </span>
                </h3>
                <div className="mt-2 h-px w-28 bg-gold/60" />
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-navy/70">
                  {jenjang.description}
                </p>

                {/* The caption card is absolutely positioned over the
                    photo's own bottom portion instead of pushing extra
                    height below it, so the photo's bottom edge always
                    reaches all the way down to the caption card's
                    bottom edge — and now the whole block's bottom edge
                    too, via flex-1. */}
                <div className="relative mt-5 w-full max-w-xs flex-1">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-md">
                    <img
                      src={jenjang.photo}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-x-4 bottom-4 z-10 flex items-start gap-3 rounded-xl bg-navy p-4 shadow-lg">
                    <Sun aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <p className="text-xs leading-relaxed text-white/90">{jenjang.caption}</p>
                  </div>
                </div>
              </div>

              {/* Right — FAQ accordion list for the active jenjang. Takes
                  the remaining space (1fr) rather than an even half, so
                  it extends further left into what used to be empty
                  space next to the narrower left column. Top-aligned
                  (not centered) so the list's own position stays put
                  regardless of the reserved extra height below it. */}
              <div className="flex flex-col justify-start gap-2.5 p-6 sm:p-8">
                {jenjang.faqs.map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <Reveal
                      key={item.q}
                      delay={i * 0.05}
                      className="rounded-xl border border-navy/10 bg-ivory/60 shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left"
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-xs font-bold text-navy">
                          ?
                        </span>
                        <span className="flex-1 text-sm text-navy">{item.q}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-4 w-4 shrink-0 text-navy/40 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="px-4 pb-3.5 pl-[3.25rem] text-sm leading-relaxed text-navy/70">
                          {item.a}
                        </p>
                      )}
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* Footer — sits directly on Box A's own exposed lower strip
                (row 3), not a separate box. Row 3 is "auto" height now,
                so Box A's cream bottom is trimmed to exactly this
                content's height instead of a fixed placeholder. */}
            <div className="relative z-10 col-start-1 row-start-3 mx-auto flex w-[88%] flex-col items-center gap-4 px-6 py-6 sm:flex-row sm:justify-between sm:px-8">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/50">
                  <Lightbulb aria-hidden="true" className="h-5 w-5 text-gold" />
                </span>
                <div>
                  <p className="font-medium text-navy">
                    Tidak menemukan jawaban yang Bunda/Ayah cari?
                  </p>
                  <p className="text-sm text-navy/60">
                    Silakan hubungi kami, tim Attaufiq siap membantu.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-md"
              >
                Hubungi Kami
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
